"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeleteDiscount, useToggleDiscount } from "@/services";
import type { Discount } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  MoreVertical,
  Power,
  PowerOff,
  Tag,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
}

function SortableHeader<TData>({
  column,
  label,
}: {
  column: Column<TData, unknown>;
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
    >
      <span>{label}</span>
      {sorted === "asc" ? (
        <ArrowUp className="h-3 w-3 text-primary" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3 w-3 text-primary" />
      ) : (
        <ArrowUpDown className="h-3 w-3 text-muted-foreground/60" />
      )}
    </button>
  );
}

export const getDiscountsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<Discount>[] => {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);

  const formatValue = (discount: Discount) => {
    if (discount.type === "PERCENTAGE") {
      return `${fmt(discount.value)}٪`;
    }
    return `${fmt(discount.value)} RLS`;
  };

  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-4 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "code",
      accessorKey: "code",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.code")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-black tracking-wider">
          <Tag className="h-3.5 w-3.5" />
          <span>{row.original.code}</span>
        </div>
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.type")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground">
          {t(`types.${row.original.type}`)}
        </span>
      ),
    },
    {
      id: "value",
      accessorKey: "value",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.value")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-black text-foreground font-mono">
          {formatValue(row.original)}
        </span>
      ),
    },
    {
      id: "usage",
      accessorKey: "usedCount",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.usage")} />
      ),
      cell: ({ row }) => {
        const d = row.original;
        const isFull = d.usedCount >= d.maxUses;
        return (
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            <span
              className={cn(
                isFull ? "text-rose-600 dark:text-rose-400" : "text-foreground",
              )}
            >
              {fmt(d.usedCount)}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{fmt(d.maxUses)}</span>
          </div>
        );
      },
    },
    {
      id: "expiresAt",
      accessorKey: "expiresAt",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.expiresAt")} />
      ),
      cell: ({ row }) => {
        const isExpired = new Date(row.original.expiresAt) < new Date();
        return (
          <span
            className={cn(
              "text-xs font-semibold",
              isExpired
                ? "text-rose-600 dark:text-rose-400 line-through"
                : "text-muted-foreground",
            )}
            suppressHydrationWarning
          >
            {formatRelativeTime(row.original.expiresAt, locale)}
          </span>
        );
      },
    },
    {
      id: "status",
      accessorKey: "active",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.status")} />
      ),
      cell: ({ row }) => {
        const isActive = row.original.active;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <SortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <span
          className="text-xs text-muted-foreground font-semibold"
          suppressHydrationWarning
        >
          {formatRelativeTime(row.original.createdAt, locale)}
        </span>
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => <DiscountActionsCell discount={row.original} t={t} />,
    },
  ];
};

function DiscountActionsCell({
  discount,
  t,
}: {
  discount: Discount;
  t: (key: string) => string;
}) {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isActive = discount.active;

  const { mutate: toggleDiscount, isPending: isToggling } = useToggleDiscount({
    onSuccessCallback: () => setToggleOpen(false),
  });

  const { mutate: deleteDiscount, isPending: isDeleting } = useDeleteDiscount({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => setToggleOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isActive
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isActive ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
            <span>{t("actions.toggle")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("actions.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={toggleOpen}
        onOpenChange={setToggleOpen}
        variant={isActive ? "warning" : "success"}
        icon={isActive ? PowerOff : Power}
        title={
          isActive
            ? t("confirmToggle.deactivateTitle")
            : t("confirmToggle.activateTitle")
        }
        confirmLabel={
          isActive
            ? t("confirmToggle.confirmDeactivate")
            : t("confirmToggle.confirmActivate")
        }
        cancelLabel={t("confirmToggle.cancel")}
        isPending={isToggling}
        onConfirm={() => toggleDiscount(discount.id)}
        description={
          <>
            {isActive
              ? t("confirmToggle.deactivateDescription")
              : t("confirmToggle.activateDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-mono font-bold text-xs">
              {discount.code}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deleteDiscount(discount.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-mono font-bold text-xs">
              {discount.code}
            </span>
          </>
        }
      />
    </>
  );
}
