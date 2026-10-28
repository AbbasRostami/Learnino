"use client";

import { DashboardPagination } from "@/components/dashboard/shared/DashboardPagination";
import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCancelOrder, useMyOrders } from "@/services";
import type { OrderStatus } from "@/types";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  Package,
  Tag,
  XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { OrderListCardSkeleton } from "./OrderListCardSkeleton";

const STATUS_STYLES = {
  PENDING: {
    borderColor: "border-amber-500/30",
    ribbonBg: "bg-linear-to-r from-amber-500/10 to-transparent",
    badgeColor:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    iconBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    Icon: Clock,
  },
  PAID: {
    borderColor: "border-emerald-500/30",
    ribbonBg: "bg-linear-to-r from-emerald-500/10 to-transparent",
    badgeColor:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    iconBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    Icon: CheckCircle2,
  },
  CANCELLED: {
    borderColor: "border-rose-500/30",
    ribbonBg: "bg-linear-to-r from-rose-500/10 to-transparent",
    badgeColor:
      "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
    iconBg: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    Icon: XCircle,
  },
} as const;

export function OrdersListClient() {
  const t = useTranslations("dashboard");
  const tOrder = useTranslations("order");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(
    undefined,
  );

  const { data, isLoading, isFetching, isError, refetch } = useMyOrders({
    page,
    limit: 10,
    status: statusFilter,
  });
  const {
    mutate: cancelOrder,
    isPending: isCancelling,
    variables: cancellingId,
  } = useCancelOrder({});

  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination?.total / pagination?.limit)
    : 1;

  const handleStatusFilterChange = (status?: OrderStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
            <Package className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">
              {t("menu.orders")}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {pagination?.total
                ? t("ordersCount", { count: pagination?.total })
                : t("ordersSubtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-2xl bg-muted/50 border border-border/40 text-xs shrink-0 overflow-x-auto">
          <Button
            type="button"
            onClick={() => handleStatusFilterChange()}
            className={cn(
              "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap",
              !statusFilter
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("filterAll")}
          </Button>
          {(["PENDING", "PAID", "CANCELLED"] as OrderStatus[]).map((st) => (
            <Button
              variant="ghost"
              key={st}
              type="button"
              onClick={() => handleStatusFilterChange(st)}
              className={cn(
                "font-semibold cursor-pointer whitespace-nowrap",
                statusFilter === st
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tOrder(`statuses.${st}`)}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <OrderListCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <DashboardQueryError
          onRetry={() => void refetch()}
          isRetrying={isFetching}
        />
      ) : items?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 rounded-3xl border border-dashed border-border/60 bg-card/40">
          <Package className="h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm font-bold text-muted-foreground">
            {t("empty.orders")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items?.map((order, idx) => {
            const style = STATUS_STYLES[order?.status];
            const StatusIcon = style.Icon;

            return (
              <motion.article
                key={order?.id}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 10 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
                className={cn(
                  "relative overflow-hidden rounded-3xl border bg-card/60 backdrop-blur-md shadow-xs hover:shadow-lg transition-all",
                  style.borderColor,
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 px-5 py-3 border-b border-dashed border-border/60",
                    style.ribbonBg,
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl",
                        style.iconBg,
                      )}
                    >
                      <StatusIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {t("orderNumber")}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-foreground">
                        #{order?.id?.slice(0, 8)}
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "shrink-0 inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border",
                      style.badgeColor,
                    )}
                  >
                    <StatusIcon className="h-3 w-3" aria-hidden="true" />
                    <span>{tOrder(`statuses.${order?.status}`)}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <p className="text-sm font-bold text-foreground line-clamp-1">
                    {order?.items?.[0]?.courseTitle || t("educationalOrder")}
                    {order?.items && order.items.length > 1 && (
                      <span className="text-xs text-muted-foreground font-semibold ms-1">
                        ({t("coursesMore", { count: order?.items?.length - 1 })}
                        )
                      </span>
                    )}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatRelativeTime(order?.createdAt, locale)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {t("itemsCount", { count: order?.items?.length ?? 0 })}
                    </span>
                    {order.discountCode && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Tag className="h-3 w-3" />
                        {order.discountCode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-dashed border-border/60 bg-muted/20">
                  <div className="flex items-baseline gap-2">
                    {order?.subtotal && order?.discountAmount > 0 && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatNumber(order?.subtotal, locale)}
                      </span>
                    )}
                    <span className="text-base font-black text-foreground">
                      {formatNumber(order?.totalAmount, locale)}
                      <span className="text-xs text-muted-foreground ms-1 font-semibold">
                        {tCart("currency")}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order?.status === "PENDING" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => cancelOrder(order?.id)}
                        disabled={isCancelling && cancellingId === order?.id}
                        className="min-w-23 text-xs font-bold  cursor-pointer gap-1.5 justify-center shadow-xs"
                      >
                        {isCancelling && cancellingId === order?.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span>{t("cancel")}</span>
                      </Button>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      className="min-w-23 text-xs font-bold cursor-pointer shadow-xs"
                    >
                      <Link
                        href={`/dashboard/orders/${order?.id}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full h-full"
                      >
                        <Eye
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{t("details")}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <DashboardPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isFetching}
      />
    </div>
  );
}
