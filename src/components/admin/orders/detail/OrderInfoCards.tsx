"use client";

import { cn } from "@/lib/utils";
import { AdminOrder, AdminOrderListItem } from "@/types";
import { formatFullDate, formatRelativeTime } from "@/utils/formatters";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Hash,
  Wallet,
  XCircle,
} from "lucide-react";

interface OrderInfoCardsProps {
  order?: AdminOrder | AdminOrderListItem | null;
  t: (key: string) => string;
  locale: string;
}

export function OrderInfoCards({ order, t, locale }: OrderInfoCardsProps) {
  const statusStyles: Record<string, string> = {
    PENDING:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    PAID: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    CANCELLED:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  };

  const statusIcons: Record<string, typeof Clock> = {
    PENDING: Clock,
    PAID: CheckCircle2,
    CANCELLED: XCircle,
  };

  const currentStatus = order?.status ?? "PENDING";
  const StatusIcon = statusIcons[currentStatus] || Clock;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <InfoCard
        icon={Hash}
        label={t("detail.orderId")}
        value={
          <span className="text-sm font-black" dir="ltr">
            #{order?.id?.slice(0, 12)}
          </span>
        }
        color="text-primary bg-primary/10"
      />
      <InfoCard
        icon={Calendar}
        label={t("detail.createdAt")}
        value={
          <span className="text-xs font-bold">
            {formatRelativeTime(order?.createdAt, locale)}
          </span>
        }
        color="text-brand-cyan bg-brand-cyan/10"
        subValue={formatFullDate(order?.createdAt, locale)}
      />
      <InfoCard
        icon={StatusIcon}
        label={t("detail.status")}
        value={
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border",
              statusStyles[currentStatus],
            )}
          >
            {t(`statuses.${currentStatus}`)}
          </span>
        }
        color={
          currentStatus === "PAID"
            ? "text-emerald-600 bg-emerald-500/10"
            : currentStatus === "CANCELLED"
              ? "text-rose-600 bg-rose-500/10"
              : "text-amber-600 bg-amber-500/10"
        }
      />
      <InfoCard
        icon={
          order?.paymentMethod === "WALLET"
            ? Wallet
            : order?.paymentMethod === "ZARINPAL"
              ? CreditCard
              : Clock
        }
        label={t("detail.paymentMethod")}
        value={
          <span className="text-xs font-black">
            {order?.paymentMethod
              ? t(`paymentMethods.${order.paymentMethod}`)
              : t("paymentMethods.notPaid")}
          </span>
        }
        color={
          order?.paymentMethod === "WALLET"
            ? "text-emerald-600 bg-emerald-500/10"
            : order?.paymentMethod === "ZARINPAL"
              ? "text-amber-600 bg-amber-500/10"
              : "text-muted-foreground bg-muted"
        }
      />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  color,
  subValue,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  color: string;
  subValue?: string;
}) {
  return (
    <div className="p-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            color,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide">
            {label}
          </span>
          <div className="mt-0.5 text-foreground truncate">{value}</div>
          {subValue && (
            <span className="text-xs text-muted-foreground truncate mt-0.5">
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
