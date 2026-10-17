"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { useProfileOverview } from "@/services";
import { formatNumber } from "@/utils/formatters";
import { ArrowLeft, Wallet, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function OverviewWalletCard() {
  const t = useTranslations("dashboard");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading } = useProfileOverview();
  const balance = data?.data?.overview?.wallet?.balance;

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-lg"
    >
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg text-white">
            <Wallet className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs font-bold text-muted-foreground mb-1">
              {t("stats.walletBalance")}
            </div>

            {isLoading || balance === undefined ? (
              <Skeleton className="h-8 w-36 rounded-xl bg-emerald-500/20 animate-pulse my-1" />
            ) : (
              <div className="text-3xl font-black text-foreground" dir="ltr">
                {formatNumber(balance, locale)}
                <span className="text-sm font-semibold text-muted-foreground ms-1">
                  {tCart("currency")}
                </span>
              </div>
            )}
          </div>
        </div>

        <Button
          size="lg"
          className="rounded-2xl gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg self-stretch sm:self-auto cursor-pointer"
        >
          <Link href="/dashboard/wallet">
            <Zap className="h-4 w-4" aria-hidden="true" />
            <span>{t("buttons.chargeWallet")}</span>
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
