"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useMyOrders } from "@/services";
import { ArrowLeft, Package } from "lucide-react";
import { useTranslations } from "next-intl";

const STATUS_COLORS = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  CANCELLED: "bg-rose-500/10 text-rose-600 border-rose-500/30",
} as const;

export function OverviewRecentOrders() {
  const t = useTranslations("dashboard");
  const tOrder = useTranslations("order");
  const tCart = useTranslations("cart");
  const locale = useLocale();

  const { data, isLoading } = useMyOrders({ page: 1, limit: 3 });
  const items = data?.data?.items ?? [];

  return (
    <section
      aria-labelledby="recent-orders-title"
      className="flex flex-col gap-4 p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-border/60">
        <h2
          id="recent-orders-title"
          className="text-sm font-black text-foreground flex items-center gap-2"
        >
          <Package className="h-4 w-4 text-brand-accent" aria-hidden="true" />
          <span>{t("menu.orders")}</span>
        </h2>
        <Link
          href="/dashboard/orders"
          className="text-[10px] font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          <span>{t("viewAll")}</span>
          <ArrowLeft className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : items?.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center gap-2">
          <Package className="h-10 w-10 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground">{t("empty.orders")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items?.map((order) => (
            <Link
              key={order?.id}
              href={`/dashboard/orders/${order?.id}`}
              className="group flex items-center justify-between gap-3 p-3 rounded-2xl border border-border/40 hover:bg-muted/40 hover:border-primary/30 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono text-muted-foreground truncate"
                    dir="ltr"
                  >
                    #{order?.id?.slice(0, 8)}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-full border",
                      STATUS_COLORS[order?.status],
                    )}
                  >
                    {tOrder(`statuses.${order?.status}`)}
                  </span>
                </div>
                <p className="text-xs font-bold text-foreground truncate">
                  {order?.items?.[0]?.courseTitle || "—"}
                  {order?.items && order?.items?.length > 1 && (
                    <span className="text-muted-foreground font-semibold ms-1">
                      + {order?.items?.length - 1}
                    </span>
                  )}
                </p>
              </div>
              <div className="text-end shrink-0" dir="ltr">
                <span className="text-sm font-black text-foreground">
                  {new Intl.NumberFormat(
                    locale === "fa" ? "fa-IR" : "en-US",
                  ).format(order?.totalAmount)}
                </span>
                <span className="text-[9px] text-muted-foreground ms-1">
                  {tCart("currency")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
