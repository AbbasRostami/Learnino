"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { AdminOrderListItem } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  Wallet,
  XCircle,
} from "lucide-react";
import { OrderActionsCell } from "./OrderActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onViewDetails: (orderId: string) => void;
}

export const getOrdersColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onViewDetails,
}: ColumnsProps): ColumnDef<AdminOrderListItem>[] => {
  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
          {formatNumber((page - 1) * limit + row.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "orderId",
      accessorKey: "id",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.orderId")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-foreground" dir="ltr">
          #{row.original?.id?.slice(0, 8)}
        </span>
      ),
    },
    {
      id: "user",
      accessorKey: "user.name",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.user")} />
      ),
      cell: ({ row }) => {
        const u = row.original?.user;
        const displayName = u?.name || u?.email?.split("@")?.[0] || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-44">
            <Avatar className="h-9 w-9 border border-border shadow-xs">
              <AvatarImage src={u?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-foreground truncate">
                {displayName}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                dir="ltr"
              >
                {u?.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "totalAmount",
      accessorKey: "totalAmount",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.totalAmount")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
          {formatNumber(row.original?.totalAmount ?? 0, locale)}{" "}
          {locale === "fa" ? "تومان" : "Toman"}
        </span>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.status")} />
      ),
      cell: ({ row }) => {
        const status = row.original?.status;
        const styles: Record<string, string> = {
          PENDING:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          PAID: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          CANCELLED:
            "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        };
        const icons: Record<string, typeof Clock> = {
          PENDING: Clock,
          PAID: CheckCircle2,
          CANCELLED: XCircle,
        };
        const Icon = icons[status ?? "PENDING"] || Clock;

        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              styles[status ?? "PENDING"] ||
                "bg-muted text-muted-foreground border-border",
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{t(`statuses.${status}`)}</span>
          </span>
        );
      },
    },
    {
      id: "paymentMethod",
      accessorKey: "paymentMethod",
      enableSorting: false,
      header: () => <span>{t("table.paymentMethod")}</span>,
      cell: ({ row }) => {
        const pm = row.original?.paymentMethod;
        if (!pm) {
          return (
            <span className="text-xs text-muted-foreground font-semibold">
              {t("paymentMethods.notPaid")}
            </span>
          );
        }

        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
            {pm === "WALLET" ? (
              <Wallet className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <CreditCard className="h-3.5 w-3.5 text-amber-500" />
            )}
            <span>{t(`paymentMethods.${pm}`)}</span>
          </span>
        );
      },
    },
    {
      id: "itemsCount",
      enableSorting: false,
      header: () => <span>{t("table.itemsCount")}</span>,
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border text-xs font-black">
          <Package className="h-3 w-3" />
          <span>
            {formatNumber(row.original?.items?.length ?? 0, locale)}{" "}
            {t("items")}
          </span>
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <OrderActionsCell
          order={row.original}
          t={t}
          onViewDetails={onViewDetails}
        />
      ),
    },
  ];
};
