"use client";

import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAdminCancelOrder } from "@/services";
import type { AdminOrderListItem } from "@/types";
import {
  formatNumber,
  formatRelativeTime,
  formatShortDate,
} from "@/utils/formatters";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  MoreVertical,
  Package,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onViewDetails: (orderId: string) => void;
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

function DateCell({
  dateStr,
  locale,
}: {
  dateStr?: string | null;
  locale: string;
}) {
  if (!dateStr) return <span className="text-xs text-muted-foreground">—</span>;

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-xs font-semibold text-foreground"
        suppressHydrationWarning
      >
        {formatRelativeTime(dateStr, locale)}
      </span>
      <span
        className="text-[10px] text-muted-foreground font-mono"
        suppressHydrationWarning
      >
        {formatShortDate(dateStr, locale)}
      </span>
    </div>
  );
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
        <span className="w-4 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-4 text-center block">
          {formatNumber((page - 1) * limit + row.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "orderId",
      accessorKey: "id",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.orderId")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-foreground" dir="ltr">
          #{row.original?.id?.slice(0, 8)}
        </span>
      ),
    },
    {
      id: "user",
      accessorKey: "user.name",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.user")} />
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
                className="text-[10px] text-muted-foreground font-mono truncate"
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
        <SortableHeader column={column} label={t("table.totalAmount")} />
      ),
      cell: ({ row }) => (
        <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">
          {formatNumber(row.original?.totalAmount ?? 0, locale)} RLS
        </span>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.status")} />
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
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border text-[10px] font-black">
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
        <SortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <DateCell dateStr={row.original?.createdAt} locale={locale} />
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

function OrderActionsCell({
  order,
  t,
  onViewDetails,
}: {
  order: AdminOrderListItem;
  t: (key: string) => string;
  onViewDetails: (orderId: string) => void;
}) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const isPending = order?.status === "PENDING";

  const { mutate: cancelOrder, isPending: isCancelling } = useAdminCancelOrder({
    onSuccessCallback: () => setCancelOpen(false),
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
            onClick={() => onViewDetails(order?.id)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Eye className="h-4 w-4 text-primary" />
            <span>{t("actions.viewDetails")}</span>
          </DropdownMenuItem>

          {isPending && (
            <>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => setCancelOpen(true)}
                className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
              >
                <XCircle className="h-4 w-4" />
                <span>{t("actions.cancelOrder")}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        variant="destructive"
        icon={XCircle}
        title={t("confirmCancel.title")}
        confirmLabel={t("confirmCancel.confirm")}
        cancelLabel={t("confirmCancel.cancel")}
        isPending={isCancelling}
        onConfirm={() => cancelOrder(order?.id)}
        description={
          <>
            {t("confirmCancel.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-mono font-bold text-xs">
              #{order?.id}
            </span>
          </>
        }
      />
    </>
  );
}
