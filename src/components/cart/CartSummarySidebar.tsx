"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  useApplyDiscount,
  useCheckoutWallet,
  useCheckoutZarinpal,
  useWallet,
} from "@/services";
import { useRemoveDiscount } from "@/services/cart/useRemoveDiscount";
import { useAuthStore } from "@/store/authStore";
import type { GetCartResponse } from "@/types";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  LogIn,
  ShieldCheck,
  Sparkles,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface CartSummarySidebarProps {
  cart: GetCartResponse["data"]["cart"] | undefined;
}

export function CartSummarySidebar({ cart }: CartSummarySidebarProps) {
  const t = useTranslations("cart");
  const tOrder = useTranslations("order");
  const locale = useLocale();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"ZARINPAL" | "WALLET">(
    "ZARINPAL",
  );

  // 🎯 هوک کیف‌پول فقط زمانی اجرا می‌شود که کاربر لاگین باشد
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

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);

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

  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="discount"
          className="text-xs font-bold text-foreground flex items-center gap-1.5"
        >
          <Tag className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
          <span>{t("discount")}</span>
        </label>

        {cart?.discount ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black truncate">
                  {cart.discount.code}
                </span>
                <span className="text-[10px] font-semibold opacity-80">
                  {cart.discount.type === "PERCENTAGE"
                    ? `${cart.discount.value}% تخفیف`
                    : `${formatPrice(cart.discount.value)} ${t("currency")}`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeDiscount()}
              disabled={isRemovingDiscount}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg hover:bg-emerald-500/20 transition-colors cursor-pointer disabled:opacity-50"
              aria-label={t("discountRemove")}
            >
              {isRemovingDiscount ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyDiscount} className="relative group">
            <div className="relative flex items-center rounded-2xl border border-border/60 bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden shadow-xs">
              <input
                id="discount"
                data-testid="coupon-input"
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder={t("discountPlaceholder")}
                className="flex-1 min-w-0 h-11 bg-transparent px-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-50 uppercase"
                disabled={isApplyingDiscount}
                maxLength={50}
                dir="ltr"
              />

              <button
                type="submit"
                data-testid="coupon-submit-btn"
                disabled={isApplyingDiscount || !discountCode.trim()}
                className={cn(
                  "shrink-0 h-9 me-1 px-4 rounded-xl text-xs font-black transition-all cursor-pointer inline-flex items-center justify-center gap-1.5",
                  discountCode.trim() && !isApplyingDiscount
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                {isApplyingDiscount ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t("applyDiscount")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-foreground">
          {t("paymentSection")}
        </span>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-testid="zarinpal-pay-btn"
            onClick={() => handleSelectPaymentMethod("ZARINPAL")}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer",
              paymentMethod === "ZARINPAL"
                ? "border-primary bg-primary/10 text-primary shadow-xs"
                : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted",
            )}
            aria-pressed={paymentMethod === "ZARINPAL"}
          >
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            <span>{tOrder("paymentMethods.ZARINPAL")}</span>
          </button>

          <button
            type="button"
            data-testid="wallet-pay-btn"
            onClick={() => handleSelectPaymentMethod("WALLET")}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer relative",
              paymentMethod === "WALLET"
                ? "border-primary bg-primary/10 text-primary shadow-xs"
                : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted",
            )}
            aria-pressed={paymentMethod === "WALLET"}
          >
            <Wallet className="h-5 w-5" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <span>{tOrder("paymentMethods.WALLET")}</span>
              {!isAuthenticated && <Lock className="h-3 w-3 text-amber-500" />}
            </div>
          </button>
        </div>

        {paymentMethod === "WALLET" && isAuthenticated && (
          <div
            className={cn(
              "p-3 rounded-2xl text-xs flex justify-between items-center border mt-1",
              isWalletInsufficient
                ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                : "bg-muted/50 border-border/40 text-muted-foreground",
            )}
          >
            <span className="font-semibold">{t("walletBalance")}:</span>
            <span className="font-bold" dir="ltr">
              {formatPrice(walletBalance)} {t("currency")}
            </span>
          </div>
        )}
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between text-muted-foreground font-semibold">
          <span>{t("subtotal")}</span>
          <span dir="ltr">
            {formatPrice(subtotal)} {t("currency")}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
            <span>{t("discountAmount")}</span>
            <span dir="ltr">
              -{formatPrice(discountAmount)} {t("currency")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/40 items-baseline">
          <span>{t("totalAmount")}</span>
          <span className="text-primary text-xl" dir="ltr">
            {formatPrice(totalPayment)}
            <span className="text-xs font-semibold text-muted-foreground ms-1">
              {t("currency")}
            </span>
          </span>
        </div>
      </div>

      <Button
        size="lg"
        data-testid="checkout-btn"
        onClick={handleCheckout}
        disabled={
          isCheckoutPending ||
          (paymentMethod === "WALLET" &&
            isWalletInsufficient &&
            isAuthenticated)
        }
        className={cn(
          "w-full rounded-2xl h-12 text-sm font-bold shadow-lg transition-all cursor-pointer gap-2",
          !isAuthenticated
            ? "bg-linear-to-r from-primary to-brand-accent text-white shadow-primary/25"
            : "shadow-primary/20",
        )}
      >
        {isCheckoutPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : !isAuthenticated ? (
          <>
            <LogIn className="h-4 w-4" />
            <span>{t("loginRequiredCheckout")}</span>
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>{t("checkout")}</span>
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
        <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
        <span>{t("secureCheckout")}</span>
      </div>
    </div>
  );
}
