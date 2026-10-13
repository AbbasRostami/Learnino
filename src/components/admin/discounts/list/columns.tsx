"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { cn } from "@/lib/utils";
import type { Discount } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Tag, XCircle } from "lucide-react";
import { DiscountActionsCell } from "./DiscountActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
}

export const getDiscountsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<Discount>[] => {
  const fmt = (n: number) => formatNumber(n, locale);

  const formatValue = (discount: Discount) => {
    if (discount?.type === "PERCENTAGE") {
      return `${fmt(discount?.value)}٪`;
    }
    return `${fmt(discount?.value)} ${locale === "fa" ? "تومان" : "Toman"}`;
  };

  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "code",
      accessorKey: "code",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.code")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-wider">
          <Tag className="h-3.5 w-3.5" />
          <span>{row.original?.code}</span>
        </div>
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.type")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground">
          {t(`types.${row.original?.type}`)}
        </span>
      ),
    },
    {
      id: "value",
      accessorKey: "value",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.value")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-black text-foreground">
          {formatValue(row?.original)}
        </span>
      ),
    },
    {
      id: "usage",
      accessorKey: "usedCount",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.usage")} />
      ),
      cell: ({ row }) => {
        const d = row.original;
        const isFull = d?.usedCount >= d?.maxUses;
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={cn(
                isFull ? "text-rose-600 dark:text-rose-400" : "text-foreground",
              )}
            >
              {fmt(d?.usedCount)}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{fmt(d?.maxUses)}</span>
          </div>
        );
      },
    },
    {
      id: "expiresAt",
      accessorKey: "expiresAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.expiresAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row.original?.expiresAt} locale={locale} />
      ),
    },
    {
      id: "status",
      accessorKey: "active",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.status")} />
      ),
      cell: ({ row }) => {
        const isActive = row.original?.active;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              isActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
            )}
          >
            {isActive ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <XCircle className="h-3 w-3" />
            )}
            <span>{isActive ? t("status.active") : t("status.inactive")}</span>
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
        <AdminDateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => <DiscountActionsCell discount={row?.original} t={t} />,
    },
  ];
};
