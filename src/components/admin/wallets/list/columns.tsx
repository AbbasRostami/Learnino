"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";
import type { AdminWalletItem } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
}

export const getWalletsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<AdminWalletItem>[] => {
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
      id: "user",
      accessorKey: "user.name",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.user")} />
      ),
      cell: ({ row }) => {
        const u = row?.original?.user;
        const displayName = u?.name || u?.email?.split("@")?.[0] || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-44">
            <Avatar className="h-9 w-9 border border-border shadow-xs shrink-0">
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
        <AdminSortableHeader column={column} label={t("table.email")} />
      ),
      cell: ({ row }) => {
        const email = row?.original?.user?.email;
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
        const phone = row?.original?.user?.phone;
        if (!phone)
          return <span className="text-xs text-muted-foreground">—</span>;

        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
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
        <AdminSortableHeader column={column} label={t("table.balance")} />
      ),
      cell: ({ row }) => {
        const balance = row?.original?.balance ?? 0;
        return (
          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
            {formatNumber(balance, locale)}{" "}
            {locale === "fa" ? "تومان" : "Toman"}
          </span>
        );
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.updatedAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row?.original?.updatedAt} locale={locale} />
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
