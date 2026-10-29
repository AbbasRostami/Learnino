"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import type { GetCartResponse } from "@/types";
import { formatNumber } from "@/utils/formatters";
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
import { Controller } from "react-hook-form";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { useCartSummary } from "./useCartSummary";

interface CartSummarySidebarProps {
  cart: GetCartResponse["data"]["cart"] | undefined;
}

export function CartSummarySidebar({ cart }: CartSummarySidebarProps) {
  const t = useTranslations("cart");
  const tOrder = useTranslations("order");
  const locale = useLocale();

  const {
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
  } = useCartSummary(cart);

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
                  {cart?.discount?.code}
                </span>
                <span className="text-xs font-semibold opacity-80">
                  {cart?.discount?.type === "PERCENTAGE"
                    ? `${cart?.discount?.value}% تخفیف`
                    : `${formatNumber(cart?.discount?.value, locale)} ${t("currency")}`}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeDiscount()}
              disabled={isRemovingDiscount}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-50"
              aria-label={t("discountRemove")}
            >
              {isRemovingDiscount ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleApplyDiscount} className="relative group">
            <Controller
              name="code"
              control={discountForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <div className="flex items-start gap-2">
                    <Input
                      {...field}
                      id="discount"
                      data-testid="coupon-input"
                      placeholder={t("discountPlaceholder")}
                      className="flex-1 h-11 rounded-2xl bg-muted/40 border-border/60 text-xs font-semibold uppercase tracking-wider focus-visible:bg-background disabled:opacity-50"
                      disabled={isApplyingDiscount}
                    />

                    <Button
                      type="submit"
                      data-testid="coupon-submit-btn"
                      disabled={isApplyingDiscount || !field.value}
                      className={cn(
                        "shrink-0 h-11 px-5 rounded-2xl text-xs font-black transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-xs",
                        field.value && !isApplyingDiscount
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground/50 cursor-not-allowed",
                      )}
                    >
                      {isApplyingDiscount ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <span>{t("applyDiscount")}</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        )}
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-foreground">
          {t("paymentSection")}
        </span>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="lg"
            type="button"
            data-testid="zarinpal-pay-btn"
            onClick={() => handleSelectPaymentMethod("ZARINPAL")}
            className={cn(
              "h-18 flex flex-col items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer",
              paymentMethod === "ZARINPAL"
                ? "border-primary bg-primary/10 text-primary shadow-xs"
                : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted",
            )}
            aria-pressed={paymentMethod === "ZARINPAL"}
          >
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            <span>{tOrder("paymentMethods.ZARINPAL")}</span>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            type="button"
            data-testid="wallet-pay-btn"
            onClick={() => handleSelectPaymentMethod("WALLET")}
            className={cn(
              "h-18 flex flex-col items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer relative",
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
          </Button>
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
            <span className="font-bold">
              {formatNumber(walletBalance, locale)} {t("currency")}
            </span>
          </div>
        )}
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between text-muted-foreground font-semibold">
          <span>{t("subtotal")}</span>
          <span>
            {formatNumber(subtotal, locale)} {t("currency")}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
            <span>{t("discountAmount")}</span>
            <span>
              -{formatNumber(discountAmount, locale)} {t("currency")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/40 items-baseline">
          <span>{t("totalAmount")}</span>
          <span className="text-primary text-xl">
            {formatNumber(totalPayment, locale)}
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

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold">
        <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
        <span>{t("secureCheckout")}</span>
      </div>
    </div>
  );
}
