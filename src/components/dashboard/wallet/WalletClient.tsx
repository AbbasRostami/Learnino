"use client";

import { DashboardPagination } from "@/components/dashboard/shared/DashboardPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { useChargeWallet, useTransactions, useWallet } from "@/services";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Info,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TransactionSkeleton } from "./TransactionSkeleton";
import { WalletBalanceSkeleton } from "./WalletBalanceSkeleton";

const PRESET_AMOUNTS_TOMAN = [50_000, 100_000, 300_000, 500_000];
const MIN_AMOUNT_TOMAN = 1_000;
const MAX_AMOUNT_TOMAN = 50_000_000;
const STEP_AMOUNT_TOMAN = 50_000;

const TX_STATUS_STYLES = {
  SUCCESS:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  PENDING:
    "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  FAILED: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  CANCELLED: "bg-muted text-muted-foreground border-border",
} as const;

export function WalletClient() {
  const t = useTranslations("dashboard");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [amountToman, setAmountToman] = useState<number>(100_000);
  const [page, setPage] = useState(1);

  const { data: walletData, isLoading: isWalletLoading } = useWallet();
  const {
    data: txData,
    isLoading: isTxLoading,
    isFetching: isTxFetching,
  } = useTransactions({ page, limit: 10 });
  const { mutate: chargeWallet, isPending: isCharging } = useChargeWallet();

  const balanceToman = walletData?.data?.wallet?.balance;

  const transactions = txData?.data?.items ?? [];
  const pagination = txData?.data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  const handleCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountToman < MIN_AMOUNT_TOMAN) return;

    chargeWallet({ amount: amountToman });
  };

  const handleAmountChange = (value: number) => {
    if (value < 0) return;
    if (value > MAX_AMOUNT_TOMAN) return;
    setAmountToman(value);
  };

  const incrementAmount = () => {
    setAmountToman((prev) =>
      Math.min(prev + STEP_AMOUNT_TOMAN, MAX_AMOUNT_TOMAN),
    );
  };

  const decrementAmount = () => {
    setAmountToman((prev) => Math.max(prev - STEP_AMOUNT_TOMAN, 0));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Wallet className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">
            {t("menu.wallet")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("walletSubtitle")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {isWalletLoading || balanceToman === undefined ? (
          <WalletBalanceSkeleton />
        ) : (
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/15 via-teal-500/8 to-card p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-52"
          >
            <div
              className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mb-2">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t("currentBalanceLabel")}
                </span>
                <div
                  className="text-3xl sm:text-5xl font-black text-foreground"
                  dir="ltr"
                >
                  {formatNumber(balanceToman, locale)}
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 ms-2">
                    {tCart("currency")}
                  </span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30">
                <Wallet className="h-7 w-7" aria-hidden="true" />
              </div>
            </div>

            <div className="relative flex items-start gap-2 p-3 rounded-2xl bg-background/50 border border-emerald-500/20 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("walletDescription")}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-black text-foreground">
              {t("chargeAccount")}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {t("chargeMinNote")}
          </p>

          <form onSubmit={handleCharge} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="amount"
                className="text-xs font-bold text-muted-foreground flex items-center justify-between"
              >
                <span>
                  {t("chargeAmountLabel")} ({tCart("currency")})
                </span>
              </label>

              <div className="relative flex items-center gap-1.5 rounded-2xl border border-border/60 bg-background focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={decrementAmount}
                  disabled={amountToman < STEP_AMOUNT_TOMAN}
                  className="shrink-0 h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="کاهش مبلغ"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <Input
                  id="amount"
                  type="number"
                  value={amountToman || ""}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  min={0}
                  step={STEP_AMOUNT_TOMAN}
                  className="flex-1 h-11 text-center text-sm font-black border-0 rounded-none focus-visible:ring-0 shadow-none bg-transparent"
                  dir="ltr"
                />

                <button
                  type="button"
                  onClick={incrementAmount}
                  className="shrink-0 h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                  aria-label="افزایش مبلغ"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PRESET_AMOUNTS_TOMAN.map((amt) => {
                const isActive = amountToman === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmountToman(amt)}
                    className={cn(
                      "py-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center justify-center gap-1",
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400 shadow-sm"
                        : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted hover:border-border",
                    )}
                  >
                    <Plus className="h-3 w-3" />
                    <span dir="ltr">{formatNumber(amt, locale)}</span>
                  </button>
                );
              })}
            </div>

            <Button
              type="submit"
              disabled={isCharging || amountToman < MIN_AMOUNT_TOMAN}
              className="w-full rounded-2xl h-12 text-xs font-black bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white cursor-pointer shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all gap-2"
            >
              {isCharging ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>{t("chargeSubmit")}</span>
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-black text-foreground">
            {t("transactionsHistory")}
          </h2>
          {pagination?.total ? (
            <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
              {pagination.total}
            </span>
          ) : null}
        </div>

        {isTxLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <TransactionSkeleton key={i} />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center py-12 border border-dashed border-border/60 rounded-3xl bg-card/40 gap-2">
            <Info className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground font-bold">
              {t("emptyTransactions")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {transactions.map((tx, idx) => {
              const isCharge = tx.type === "CHARGE";
              const isRefund = tx.type === "REFUND";
              const isIncoming = isCharge || isRefund;
              const amountToman = tx.amount;

              return (
                <motion.div
                  key={tx.id}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 10 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: Math.min(idx * 0.04, 0.2),
                  }}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md shadow-xs hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        isIncoming
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      {isIncoming ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-xs font-bold text-foreground truncate">
                          {tx.description}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-black px-2 py-0.5 rounded-full border",
                            TX_STATUS_STYLES[tx.status] ||
                              TX_STATUS_STYLES.CANCELLED,
                          )}
                        >
                          {t(`transactionStatus${tx.status}`)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatRelativeTime(tx.createdAt, locale)}</span>
                        {tx.refId && (
                          <span
                            className="bg-muted/40 px-1.5 py-0.5 rounded"
                            dir="ltr"
                          >
                            {t("transactionRefId")}: {tx.refId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-end shrink-0" dir="ltr">
                    <span
                      className={cn(
                        "text-sm font-black",
                        isIncoming
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground",
                      )}
                    >
                      {isIncoming ? "+" : "-"}
                      {formatNumber(amountToman, locale)}
                    </span>
                    <span className="text-xs text-muted-foreground ms-1 font-semibold">
                      {tCart("currency")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <DashboardPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isTxFetching}
        />
      </div>
    </div>
  );
}
