"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Copy,
  Hash,
  HeadphonesIcon,
  Home,
  RotateCcw,
  ShieldAlert,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface PaymentFailedClientProps {
  reason?: string;
  authority?: string;
}

export function PaymentFailedClient({
  reason,
  authority,
}: PaymentFailedClientProps) {
  const t = useTranslations("payment.failed");
  const prefersReducedMotion = useReducedMotion();

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} کپی شد`);
  };

  return (
    <div className="relative min-h-svh flex items-center justify-center overflow-hidden bg-linear-to-br from-rose-50/50 via-background to-orange-50/30 dark:from-rose-950/20 dark:via-background dark:to-orange-950/10 px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 dark:bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="relative rounded-3xl border border-rose-500/20 bg-card/80 backdrop-blur-xl shadow-2xl shadow-rose-500/10 dark:shadow-rose-500/5 p-8 md:p-10">
          <div className="absolute -top-px inset-s-10 inset-e-10 h-px bg-linear-to-r from-transparent via-rose-500/60 to-transparent" />

          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={
                prefersReducedMotion ? undefined : { scale: 0, rotate: -180 }
              }
              animate={
                prefersReducedMotion ? undefined : { scale: 1, rotate: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-rose-500/30 blur-2xl rounded-full animate-pulse" />
              <motion.div
                animate={
                  prefersReducedMotion ? undefined : { x: [0, -5, 5, -5, 5, 0] }
                }
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative flex items-center justify-center h-24 w-24 rounded-full bg-linear-to-br from-rose-500 to-rose-600 shadow-xl shadow-rose-500/40"
              >
                <XCircle className="h-12 w-12 text-white" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-black mb-4 shadow-sm">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight mb-3">
              {t("title")}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              {t("subtitle")}
            </p>
          </div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 backdrop-blur-sm p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-black text-rose-700 dark:text-rose-400 mb-1.5">
                  {t("reasonTitle")}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {reason || t("defaultReason")}
                </p>

                {authority && (
                  <div className="mt-3 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/20">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                      <Hash className="h-3 w-3 shrink-0" />
                      <span className="font-semibold shrink-0">
                        {t("authorityLabel")}:
                      </span>
                      <span
                        className="font-bold text-foreground truncate"
                        dir="ltr"
                      >
                        {authority}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(authority, t("authorityLabel"))}
                      className="shrink-0 h-6 w-6 flex items-center justify-center rounded-md hover:bg-rose-500/10 transition-colors text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                      aria-label="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 rounded-2xl border border-border/50 bg-muted/30 dark:bg-muted/10 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-black text-foreground">
                {t("commonIssues")}
              </h3>
            </div>

            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              <IssueItem text={t("issue1")} />
              <IssueItem text={t("issue2")} />
              <IssueItem text={t("issue3")} />
              <IssueItem text={t("issue4")} />
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <Link
              href="/cart"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-1 rounded-2xl h-12 gap-2 shadow-lg shadow-rose-500/20 cursor-pointer bg-linear-to-r from-rose-500 to-rose-600 hover:opacity-90 font-bold text-white",
              )}
            >
              <RotateCcw className="h-4 w-4" />
              <span>{t("retryPayment")}</span>
            </Link>

            <Link
              href="/cart"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 rounded-2xl h-12 gap-2 cursor-pointer font-bold border-border/60 hover:bg-muted",
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{t("backToCart")}</span>
            </Link>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-brand-accent/5 to-transparent p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HeadphonesIcon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-foreground mb-1.5">
                  {t("supportTitle")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {t("supportText")}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-full text-xs gap-1.5 h-8 cursor-pointer border-primary/30 hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <HeadphonesIcon className="h-3 w-3" />
                    <span>{t("contactSupport")}</span>
                  </Link>

                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-full text-xs gap-1.5 h-8 cursor-pointer text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Home className="h-3 w-3" />
                    <span>{t("backToHome")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function IssueItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 leading-relaxed">
      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
