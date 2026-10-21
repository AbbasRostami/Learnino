"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCancelOrder, useOrder } from "@/services";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Package,
  Tag,
  XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { OrderDetailSkeleton } from "./OrderDetailSkeleton";
const STATUS_STYLES = {
  PENDING: {
    badgeColor:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    Icon: Clock,
  },
  PAID: {
    badgeColor:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    Icon: CheckCircle2,
  },
  CANCELLED: {
    badgeColor:
      "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
    Icon: XCircle,
  },
} as const;

interface OrderDetailClientProps {
  orderId: string;
}

export function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const t = useTranslations("dashboard");
  const tOrder = useTranslations("order");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading } = useOrder(orderId);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder({});

  const order = data?.data?.order;

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3 rounded-3xl border border-dashed border-border/60 bg-card/40">
        <Package className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm font-bold text-muted-foreground">
          {t("orderNotFound")}
        </p>
        <Button variant="outline" className="rounded-full px-6">
          <Link href="/dashboard/orders">{t("backToOrders")}</Link>
        </Button>
      </div>
    );
  }

  const style = STATUS_STYLES[order?.status];
  const StatusIcon = style.Icon;

  const subtotal = order?.subtotal ?? order?.totalAmount;
  const discountAmount = order?.discountAmount ?? 0;
  const discountCode = order?.discountCode;
  const hasDiscount = discountAmount > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl h-9 w-9 shrink-0"
          >
            <Link href="/dashboard/orders" aria-label={t("backToOrders")}>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-black text-foreground">
                #{order.id.slice(0, 8)}
              </h1>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border",
                  style.badgeColor,
                )}
              >
                <StatusIcon className="h-3 w-3" />
                {tOrder(`statuses.${order.status}`)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("submittedAt")} {formatRelativeTime(order?.createdAt, locale)}
            </p>
          </div>
        </div>

        {order?.status === "PENDING" && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => cancelOrder(order?.id)}
            disabled={isCancelling}
            className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            {isCancelling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span>{t("cancelThisOrder")}</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {t("purchasedCourses")}
          </h2>
          {order?.items?.map((item, idx) => (
            <motion.div
              key={item?.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
              className="flex items-center gap-4 p-4 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs hover:border-primary/30 transition-all"
            >
              <Link
                href={item?.courseSlug ? `/courses/${item?.courseSlug}` : "#"}
                className="relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted"
              >
                {item?.courseImageUrl ? (
                  <Image
                    src={item?.courseImageUrl}
                    alt={item?.courseTitle}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground truncate">
                  {item?.courseSlug ? (
                    <Link
                      href={`/courses/${item?.courseSlug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item?.courseTitle}
                    </Link>
                  ) : (
                    item?.courseTitle
                  )}
                </h3>
                <span className="text-xs text-muted-foreground mt-1 inline-block">
                  {t("courseIdLabel")}: {item?.courseId?.slice(0, 8)}...
                </span>
              </div>
              <div className="text-end shrink-0">
                <span className="text-base font-black text-foreground">
                  {formatNumber(item?.price, locale)}
                </span>
                <span className="text-xs text-muted-foreground ms-1">
                  {tCart("currency")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg lg:sticky lg:top-24">
          <h2 className="text-xs font-bold text-foreground uppercase tracking-wider pb-3 border-b border-dashed border-border/60">
            {t("orderSummary")}
          </h2>

          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              {t("paymentMethodLabel")}
            </span>
            <span className="font-bold text-foreground">
              {order?.paymentMethod
                ? tOrder(`paymentMethods.${order?.paymentMethod}`)
                : t("notPaidYet")}
            </span>
          </div>

          <hr className="border-dashed border-border/60" />

          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-semibold">
              {t("subtotalLabel")}
            </span>
            <span className="font-bold text-foreground">
              {formatNumber(subtotal, locale)} {tCart("currency")}
            </span>
          </div>

          {hasDiscount && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-emerald-500" />
                  {t("discountLabel")}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  -{formatNumber(discountAmount, locale)} {tCart("currency")}
                </span>
              </div>

              {discountCode && (
                <div className="flex justify-between items-center text-xs bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-3 py-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Tag className="h-3 w-3" />
                    {t("discountCodeLabel")}
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {discountCode}
                  </span>
                </div>
              )}
            </>
          )}

          <hr className="border-dashed border-border/60" />

          <div className="flex justify-between items-baseline text-sm">
            <span className="font-bold text-foreground">
              {t("totalAmountLabel")}
            </span>
            <span className="text-xl font-black text-primary">
              {formatNumber(order?.totalAmount, locale)}
              <span className="text-xs text-muted-foreground font-semibold ms-1">
                {tCart("currency")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
