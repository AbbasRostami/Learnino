"use client";

import { useRouter } from "@/i18n/routing";
import { ApplyDiscountFormValues, getApplyDiscountSchema } from "@/schemas";
import {
  useApplyDiscount,
  useCheckoutWallet,
  useCheckoutZarinpal,
  useRemoveDiscount,
  useWallet,
} from "@/services";
import { useAuthStore } from "@/store/authStore";
import type { GetCartResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useCartSummary(
  cart: GetCartResponse["data"]["cart"] | undefined,
) {
  const t = useTranslations("cart");
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [paymentMethod, setPaymentMethod] = useState<"ZARINPAL" | "WALLET">(
    "ZARINPAL",
  );

  const { data: walletData } = useWallet();
  const walletBalance = walletData?.data?.wallet?.balance ?? 0;

  const discountForm = useForm<ApplyDiscountFormValues>({
    resolver: zodResolver(getApplyDiscountSchema(t)),
    defaultValues: { code: "" },
  });

  const { mutate: applyDiscount, isPending: isApplyingDiscount } =
    useApplyDiscount({
      onSuccessCallback: () => discountForm.reset(),
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
      router.push("/login?redirectTo=%2Fcart");
      return;
    }
    setPaymentMethod(method);
  };

  const handleApplyDiscount = discountForm.handleSubmit((data) => {
    if (!isAuthenticated) {
      toast.info(t("loginRequiredDiscount"));
      router.push("/login?redirectTo=%2Fcart");
      return;
    }
    applyDiscount({ code: data.code });
  });

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info(t("loginRequiredCheckout"));
      router.push("/login?redirectTo=%2Fcart");
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
    discountForm,
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
