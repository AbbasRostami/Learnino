"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  Clock,
  MinusCircle,
  PlusCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
}

export const getTransactionsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<Transaction>[] => {
  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-8 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-8 text-center block">
          {formatNumber((page - 1) * limit + row?.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "user",
      accessorKey: "user.name",
      enableSorting: false,
      header: () => <span>{t("table.user")}</span>,
      cell: ({ row }) => {
        const u = row?.original?.user;
        if (!u) return <span className="text-xs text-muted-foreground">—</span>;
        const displayName = u?.name || u?.email?.split("@")?.[0] || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-40">
            <Avatar className="h-8 w-8 border border-border shadow-xs shrink-0">
              <AvatarImage src={u?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 min-w-0">
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
      id: "amount",
      accessorKey: "amount",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.amount")} />
      ),
      cell: ({ row }) => {
        const tx = row?.original;
        const isPositive = tx?.type === "CHARGE" || tx?.type === "REFUND";
        return (
          <span
            className={cn(
              "text-xs font-black",
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400",
            )}
          >
            {isPositive ? "+" : "-"}
            {formatNumber(tx?.amount ?? 0, locale)}{" "}
            {locale === "fa" ? "تومان" : "Toman"}
          </span>
        );
      },
    },
    {
      id: "type",
      accessorKey: "type",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.type")} />
      ),
      cell: ({ row }) => {
        const type = row?.original?.type;
        const icons = {
          CHARGE: PlusCircle,
          PURCHASE: MinusCircle,
          REFUND: RefreshCw,
        };
        const colors = {
          CHARGE: "text-emerald-600 bg-emerald-500/10 border-emerald-500/30",
          PURCHASE: "text-rose-600 bg-rose-500/10 border-rose-500/30",
          REFUND: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30",
        };
        const Icon = icons[type] || PlusCircle;

        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              colors[type] || "bg-muted text-muted-foreground border-border",
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{t(`types.${type}`)}</span>
          </span>
        );
      },
    },
    {
      id: "description",
      accessorKey: "description",
      enableSorting: false,
      header: () => <span>{t("table.description")}</span>,
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground font-semibold truncate max-w-xs block">
          {row.original?.description || "—"}
        </span>
      ),
    },
    {
      id: "refId",
      accessorKey: "refId",
      enableSorting: false,
      header: () => <span>{t("table.refId")}</span>,
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground" dir="ltr">
          {row?.original?.refId || "—"}
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
        const status = row?.original?.status;
        const styles = {
          SUCCESS:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          PENDING:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          FAILED:
            "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
          CANCELLED: "bg-muted text-muted-foreground border-border",
        };
        const icons = {
          SUCCESS: CheckCircle2,
          PENDING: Clock,
          FAILED: XCircle,
          CANCELLED: XCircle,
        };
        const Icon = icons[status] || Clock;

        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              styles[status] || "bg-muted text-muted-foreground border-border",
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{t(`status.${status}`)}</span>
          </span>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row?.original?.createdAt} locale={locale} />
      ),
    },
  ];
};
