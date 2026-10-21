"use client";

import { useRouter } from "@/i18n/routing";
import {
  useApplyDiscount,
  useCheckoutWallet,
  useCheckoutZarinpal,
  useRemoveDiscount,
  useWallet,
} from "@/services";
import { useAuthStore } from "@/store/authStore";
import type { GetCartResponse } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function useCartSummary(
  cart: GetCartResponse["data"]["cart"] | undefined,
) {
  const t = useTranslations("cart");
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"ZARINPAL" | "WALLET">(
    "ZARINPAL",
  );

  const { data: walletData } = useWallet();
  const walletBalance = walletData?.data?.wallet?.balance ?? 0;

  const { mutate: applyDiscount, isPending: isApplyingDiscount } =
    useApplyDiscount({
      onSuccessCallback: () => setDiscountCode(""),
    });

  const { mutate: removeDiscount, isPending: isRemovingDiscount } =
    useRemoveDiscount();

  const { mutate: checkoutZarinpal, isPending: isZarinpalPending } =
    useCheckoutZarinpal();

  const { mutate: checkoutWallet, isPending: isWalletPending } =
    useCheckoutWallet({
      onSuccessCallback: (data) => {
        router.push(
          `/payment/success?status=success&refId=${data?.order?.id}&amount=${data?.order?.totalAmount}&newBalance=${data?.newBalance}`,
        );
      },
    });

  const subtotal = cart?.subtotal ?? 0;
  const totalPayment = cart?.totalPayment ?? subtotal;
  const discountAmount = cart?.discount ? subtotal - totalPayment : 0;
  const isWalletInsufficient = walletBalance < totalPayment;

  const handleSelectPaymentMethod = (method: "ZARINPAL" | "WALLET") => {
    if (method === "WALLET" && !isAuthenticated) {
      toast.info(t("loginRequired"));
      router.push("/login");
      return;
    }
    setPaymentMethod(method);
  };

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    if (!isAuthenticated) {
      toast.info(t("loginRequiredDiscount"));
      router.push("/login");
      return;
    }

    applyDiscount({ code: discountCode });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info(t("loginRequiredCheckout"));
      router.push("/login");
      return;
    }

    if (paymentMethod === "ZARINPAL") {
      checkoutZarinpal();
    } else {
      if (isWalletInsufficient) {
        toast.error(t("insufficientBalance"));
        return;
      }
      checkoutWallet();
    }
  };

  const isCheckoutPending = isZarinpalPending || isWalletPending;

  return {
    isAuthenticated,
    discountCode,
    setDiscountCode,
    paymentMethod,
    walletBalance,
    isApplyingDiscount,
    isRemovingDiscount,
    isCheckoutPending,
    subtotal,
    totalPayment,
    discountAmount,
    isWalletInsufficient,
    removeDiscount,
    handleSelectPaymentMethod,
    handleApplyDiscount,
    handleCheckout,
  };
}
