// src/components/admin/users/list/columns.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminUserListItem } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "cn";
import {
  BookOpen,
  Mail,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  User,
  UserCheck,
  UserX,
} from "lucide-react";
import { AdminDateCell, AdminSortableHeader } from "../../shared";
import { UserActionsCell } from "./UserActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  onSortChange?: (field: string) => void;
}

export const getUsersColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<AdminUserListItem>[] => {
  const fmt = (n: number) => formatNumber(n, locale);

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
      id: "user",
      accessorKey: "name",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.user")} />
      ),
      cell: ({ row }) => {
        const user = row?.original;
        const displayName =
          user?.name || user?.email?.split("@")?.[0] || t("detail.noName");
        const avatarInitial = (user?.name || user?.email || "?")
          .charAt(0)
          ?.toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-55">
            <Avatar className="h-10 w-10 border border-border shadow-xs shrink-0">
              <AvatarImage src={user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {displayName}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "contact",
      accessorKey: "email",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.contact")} />
      ),
      cell: ({ row }) => {
        const user = row?.original;
        return (
          <div className="flex flex-col gap-1 min-w-50">
            <div className="flex items-center gap-1.5 text-xs text-foreground">
              <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate font-semibold" dir="ltr">
                {user?.email}
              </span>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="h-3 w-3 shrink-0" />
                <span dir="ltr">{user?.phone}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "role",
      accessorKey: "role",
      enableSorting: false,
      header: () => <span>{t("table.role")}</span>,
      cell: ({ row }) => {
        const role = row?.original?.role;
        const isSuper = role === "SUPER_ADMIN";
        const isAdmin = role === "ADMIN";

        const config = isSuper
          ? {
              bg: "bg-purple-500/10",
              text: "text-purple-600 dark:text-purple-400",
              border: "border-purple-500/30",
              icon: ShieldCheck,
              label: t("filters.roleSuperAdmin"),
            }
          : isAdmin
            ? {
                bg: "bg-primary/10",
                text: "text-primary",
                border: "border-primary/30",
                icon: ShieldCheck,
                label: t("filters.roleAdmin"),
              }
            : {
                bg: "bg-muted",
                text: "text-muted-foreground",
                border: "border-border",
                icon: User,
                label: t("filters.roleUser"),
              };

        const Icon = config.icon;

        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              config.bg,
              config.text,
              config.border,
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{config.label}</span>
          </span>
        );
      },
    },
    {
      id: "status",
      accessorKey: "isVerified",
      enableSorting: false,
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const isVerified = row?.original?.isVerified;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              isVerified
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
            )}
          >
            {isVerified ? (
              <UserCheck className="h-3 w-3" />
            ) : (
              <UserX className="h-3 w-3" />
            )}
            <span>
              {isVerified ? t("detail.verified") : t("detail.unverified")}
            </span>
          </span>
        );
      },
    },
    {
      id: "stats",
      enableSorting: false,
      header: () => <span>{t("table.stats")}</span>,
      cell: ({ row }) => {
        const stats = row?.original?.stats;
        return (
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-bold">
            <span
              className="flex items-center gap-1"
              title={t("stats.enrollments")}
            >
              <BookOpen className="h-3 w-3 text-primary" />
              <span>{fmt(stats?.enrollments ?? 0)}</span>
            </span>
            <span className="flex items-center gap-1" title={t("stats.orders")}>
              <Package className="h-3 w-3 text-brand-accent" />
              <span>{fmt(stats?.orders ?? 0)}</span>
            </span>
            <span
              className="flex items-center gap-1"
              title={t("stats.comments")}
            >
              <MessageCircle className="h-3.5 w-3.5 text-brand-cyan" />
              <span>{fmt(stats?.comments ?? 0)}</span>
            </span>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.joined")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row?.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => <UserActionsCell user={row?.original} t={t} />,
    },
  ];
};
