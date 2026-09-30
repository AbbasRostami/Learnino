"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { AdminWalletItem, Transaction } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MinusCircle,
  Phone,
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
  dateStr: string | null | undefined;
  locale: string;
}) {
  if (!dateStr) return <span className="text-xs text-muted-foreground">—</span>;

  const date = new Date(dateStr);
  const relative = formatRelativeTime(dateStr, locale);
  const exact = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-xs font-semibold text-foreground"
        suppressHydrationWarning
      >
        {relative}
      </span>
      <span
        className="text-[10px] text-muted-foreground font-mono"
        suppressHydrationWarning
      >
        {exact}
      </span>
    </div>
  );
}

export const getWalletsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<AdminWalletItem>[] => {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);

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
            <span className="text-sm font-black text-foreground truncate">
              {displayName}
            </span>
          </div>
        );
      },
    },
    {
      id: "email",
      accessorKey: "user.email",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.email")} />
      ),
      cell: ({ row }) => {
        const email = row.original?.user?.email;
        if (!email)
          return <span className="text-xs text-muted-foreground">—</span>;

        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground min-w-40">
            <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="truncate font-semibold" dir="ltr">
              {email}
            </span>
          </div>
        );
      },
    },
    {
      id: "phone",
      accessorKey: "user.phone",
      enableSorting: false,
      header: () => <span>{t("table.phone")}</span>,
      cell: ({ row }) => {
        const phone = row.original?.user?.phone;
        if (!phone)
          return <span className="text-xs text-muted-foreground">—</span>;

        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground font-mono">
            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span dir="ltr">{phone}</span>
          </div>
        );
      },
    },
    {
      id: "balance",
      accessorKey: "balance",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.balance")} />
      ),
      cell: ({ row }) => {
        const balance = row.original?.balance ?? 0;
        return (
          <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
            {fmt(balance)} RLS
          </span>
        );
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.updatedAt")} />
      ),
      cell: ({ row }) => (
        <DateCell dateStr={row.original?.updatedAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <Link
          href={`/admin/users/${row.original?.userId}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
        >
          <span>{t("table.viewUser")}</span>
          <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-90" />
        </Link>
      ),
    },
  ];
};

export const getTransactionsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<Transaction>[] => {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);

  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-8 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-8 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "user",
      accessorKey: "user.name",
      enableSorting: false,
      header: () => <span>{t("table.user")}</span>,
      cell: ({ row }) => {
        const u = row.original?.user;
        if (!u) return <span className="text-xs text-muted-foreground">—</span>;
        const displayName = u?.name || u?.email?.split("@")?.[0] || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-40">
            <Avatar className="h-8 w-8 border border-border shadow-xs">
              <AvatarImage src={u?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-[10px]">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-xs font-black text-foreground truncate">
                {displayName}
              </span>
              <span
                className="text-[10px] text-muted-foreground truncate font-mono"
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
        <SortableHeader column={column} label={t("table.amount")} />
      ),
      cell: ({ row }) => {
        const tx = row.original;
        const isPositive = tx?.type === "CHARGE" || tx?.type === "REFUND";
        return (
          <span
            className={cn(
              "text-xs font-black font-mono",
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400",
            )}
          >
            {isPositive ? "+" : "-"}
            {fmt(tx?.amount ?? 0)} RLS
          </span>
        );
      },
    },
    {
      id: "type",
      accessorKey: "type",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.type")} />
      ),
      cell: ({ row }) => {
        const type = row.original?.type;
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
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <span className="text-xs font-mono text-muted-foreground" dir="ltr">
          {row.original?.refId || "—"}
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
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <SortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <DateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
  ];
};
