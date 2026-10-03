"use client";

import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Copy,
  Hash,
  Home,
  PartyPopper,
  PlayCircle,
  Receipt,
  Sparkles,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PaymentSuccessClientProps {
  refId?: string;
  amount?: number;
  newBalance?: number;
  transactionId?: string;
  orderId?: string;
}

export function PaymentSuccessClient({
  refId,
  amount,
  newBalance,
  transactionId,
  orderId,
}: PaymentSuccessClientProps) {
  const t = useTranslations("payment.success");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [showConfetti, setShowConfetti] = useState(false);

  // 🎯 تشخیص نوع پرداخت (شارژ کیف پول vs خرید دوره)
  const isWalletCharge = !!newBalance && !orderId;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);

  const currentDateTime = new Intl.DateTimeFormat(
    locale === "fa" ? "fa-IR" : "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(new Date());

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} کپی شد`);
  };

  return (
    <div className="relative min-h-svh flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50/50 via-background to-primary/5 dark:from-emerald-950/20 dark:via-background dark:to-primary/10 px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -20,
                x: Math.random() * 100 - 50 + "%",
                opacity: 1,
              }}
              animate={{
                y: "110vh",
                rotate: Math.random() * 720,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "linear",
              }}
              className="absolute top-0"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <div
                className={`h-3 w-3 rounded-sm ${
                  [
                    "bg-emerald-500",
                    "bg-primary",
                    "bg-brand-accent",
                    "bg-amber-500",
                    "bg-rose-500",
                  ][Math.floor(Math.random() * 5)]
                }`}
              />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative rounded-3xl border border-emerald-500/20 bg-card/80 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-500/5 p-8 md:p-10">
          <div className="absolute -top-px inset-s-10 inset-e-10 h-px bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />

          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={prefersReducedMotion ? undefined : { scale: 0 }}
              animate={prefersReducedMotion ? undefined : { scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full animate-pulse" />
              <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/40">
                <CheckCircle2
                  className="h-12 w-12 text-white"
                  strokeWidth={2.5}
                />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-amber-400" />
                <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-emerald-400" />
                <Sparkles className="absolute top-1/2 -right-4 h-3 w-3 text-primary" />
              </motion.div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-black mb-4 shadow-sm">
              <PartyPopper className="h-3.5 w-3.5" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight mb-3">
              {isWalletCharge ? t("walletTitle") : t("title")}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              {isWalletCharge ? t("walletSubtitle") : t("subtitle")}
            </p>
          </div>

          {(refId || amount || newBalance || transactionId || orderId) && (
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 rounded-2xl border border-border/50 bg-muted/30 dark:bg-muted/10 backdrop-blur-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-background/50">
                <Receipt className="h-4 w-4 text-emerald-500" />
                <h3 className="text-sm font-black text-foreground">
                  {t("detailsTitle")}
                </h3>
              </div>

              <div className="p-5 flex flex-col gap-3">
                {refId && (
                  <DetailRow
                    icon={<Hash className="h-3.5 w-3.5" />}
                    label={t("refId")}
                    value={refId}
                    copyable
                    onCopy={() => handleCopy(refId, t("refId"))}
                  />
                )}

                {orderId && (
                  <DetailRow
                    icon={<Receipt className="h-3.5 w-3.5" />}
                    label={t("orderId")}
                    value={orderId}
                    copyable
                    onCopy={() => handleCopy(orderId, t("orderId"))}
                    truncate
                  />
                )}

                {transactionId && !orderId && (
                  <DetailRow
                    icon={<Hash className="h-3.5 w-3.5" />}
                    label={t("transactionId")}
                    value={transactionId}
                    copyable
                    onCopy={() => handleCopy(transactionId, t("transactionId"))}
                    truncate
                  />
                )}

                {amount !== undefined && amount > 0 && (
                  <DetailRow
                    icon={<Wallet className="h-3.5 w-3.5" />}
                    label={t("amount")}
                    value={
                      <span className="text-emerald-600 dark:text-emerald-400 font-black text-base">
                        {formatPrice(amount)} {tCart("currency")}
                      </span>
                    }
                  />
                )}

                {newBalance !== undefined && (
                  <DetailRow
                    icon={<Wallet className="h-3.5 w-3.5" />}
                    label={t("newBalance")}
                    value={
                      <span className="text-primary font-black text-base">
                        {formatPrice(newBalance)} {tCart("currency")}
                      </span>
                    }
                  />
                )}

                <DetailRow
                  icon={<Sparkles className="h-3.5 w-3.5" />}
                  label={t("dateTime")}
                  value={currentDateTime}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-brand-accent/5 to-transparent p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black text-foreground">
                {t("nextSteps")}
              </h3>
            </div>

            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              <TipItem text={t("tip1")} />
              <TipItem text={t("tip2")} />
              <TipItem text={t("tip3")} />
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {isWalletCharge ? (
              <Link
                href="/dashboard/wallet"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex-1 rounded-2xl h-12 gap-2 shadow-lg shadow-primary/20 cursor-pointer bg-linear-to-r from-primary to-brand-accent hover:opacity-90 font-bold text-white",
                )}
              >
                <Wallet className="h-4 w-4" />
                <span>{t("viewWallet")}</span>
              </Link>
            ) : (
              <Link
                href="/dashboard/my-courses"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex-1 rounded-2xl h-12 gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer bg-linear-to-r from-emerald-500 to-emerald-600 hover:opacity-90 font-bold text-white",
                )}
              >
                <PlayCircle className="h-4 w-4" />
                <span>{t("myCourses")}</span>
              </Link>
            )}

            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 rounded-2xl h-12 gap-2 cursor-pointer font-bold border-border/60 hover:bg-muted",
              )}
            >
              <Home className="h-4 w-4" />
              <span>{t("backToHome")}</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  copyable,
  onCopy,
  truncate,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
  onCopy?: () => void;
  truncate?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground font-semibold shrink-0">
        <span className="text-muted-foreground/70">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`font-bold text-foreground ${truncate ? "truncate max-w-45" : ""}`}
          dir="ltr"
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={onCopy}
            className="shrink-0 h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-primary cursor-pointer"
            aria-label="Copy"
          >
            <Copy className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 leading-relaxed">
      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
      <span>{text}</span>
    </li>
  );
}
