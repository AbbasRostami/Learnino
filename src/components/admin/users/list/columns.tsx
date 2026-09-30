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
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useBanUser } from "@/services";
import type { AdminUserListItem } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Eye,
  Mail,
  MessageCircle,
  MoreVertical,
  Package,
  Phone,
  ShieldCheck,
  ShieldOff,
  User,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  sortBy?: string;
  order?: string;
  onSortChange?: (field: string) => void;
  page?: number;
  limit?: number;
}

export const getUsersColumns = ({
  t,
  locale,
  sortBy,
  order,
  onSortChange,
  page = 1,
  limit = 10,
}: ColumnsProps): ColumnDef<AdminUserListItem>[] => {
  const renderSortIcon = (field: string) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-3 w-3 text-muted-foreground/60" />;
    }
    return order === "asc" ? (
      <ArrowUp className="h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 text-primary" />
    );
  };

  return [
    {
      id: "rowNumber",
      header: () => (
        <span className="w-4 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => {
        const rowNum = (page - 1) * limit + row.index + 1;
        const formattedNum = new Intl.NumberFormat(
          locale === "fa" ? "fa-IR" : "en-US",
        ).format(rowNum);

        return (
          <span className="text-xs font-mono font-bold text-muted-foreground/80 w-4 text-center block">
            {formattedNum}
          </span>
        );
      },
    },
    {
      id: "user",
      accessorKey: "name",
      header: () => (
        <button
          type="button"
          onClick={() => onSortChange?.("name")}
          className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
        >
          <span>{t("table.user")}</span>
          {renderSortIcon("name")}
        </button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        const displayName =
          user?.name || user?.email?.split("@")?.[0] || t("detail.noName");
        const avatarInitial = (user?.name || user?.email || "?")
          .charAt(0)
          ?.toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-55">
            <Avatar className="h-10 w-10 border border-border shadow-xs">
              <AvatarImage src={user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {displayName}
              </span>
              <span
                className="text-[10px] text-muted-foreground truncate font-mono"
                dir="ltr"
              >
                #{user?.id?.slice(0, 8)}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "contact",
      accessorKey: "email",
      header: () => (
        <button
          type="button"
          onClick={() => onSortChange?.("email")}
          className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
        >
          <span>{t("table.contact")}</span>
          {renderSortIcon("email")}
        </button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex flex-col gap-1 min-w-50">
            <div className="flex items-center gap-1.5 text-xs text-foreground">
              <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate font-semibold" dir="ltr">
                {user?.email}
              </span>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Phone className="h-3 w-3 shrink-0" />
                <span className="font-mono" dir="ltr">
                  {user.phone}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "role",
      header: () => <span>{t("table.role")}</span>,
      cell: ({ row }) => {
        const role = row.original?.role;
        const isAdmin = role === "ADMIN";
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
              isAdmin
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-muted text-muted-foreground border-border",
            )}
          >
            {isAdmin ? (
              <ShieldCheck className="h-3 w-3" />
            ) : (
              <User className="h-3 w-3" />
            )}
            <span>
              {isAdmin ? t("filters.roleAdmin") : t("filters.roleUser")}
            </span>
          </span>
        );
      },
    },
    {
      id: "status",
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const isVerified = row.original?.isVerified;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
      header: () => <span>{t("table.stats")}</span>,
      cell: ({ row }) => {
        const stats = row.original?.stats;
        return (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-bold">
            <span
              className="flex items-center gap-1"
              title={t("stats.enrollments")}
            >
              <BookOpen className="h-3 w-3 text-primary" />
              <span>{stats?.enrollments ?? 0}</span>
            </span>
            <span className="flex items-center gap-1" title={t("stats.orders")}>
              <Package className="h-3 w-3 text-brand-accent" />
              <span>{stats?.orders ?? 0}</span>
            </span>
            <span
              className="flex items-center gap-1"
              title={t("stats.comments")}
            >
              <MessageCircle className="h-3.5 w-3.5 text-brand-cyan" />
              <span>{stats?.comments ?? 0}</span>
            </span>
          </div>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: () => (
        <button
          type="button"
          onClick={() => onSortChange?.("createdAt")}
          className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
        >
          <span>{t("table.joined")}</span>
          {renderSortIcon("createdAt")}
        </button>
      ),
      cell: ({ row }) => (
        <span
          className="text-xs text-muted-foreground font-semibold"
          suppressHydrationWarning
        >
          {formatRelativeTime(row.original?.createdAt, locale)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => <UserActionsCell user={row.original} t={t} />,
    },
  ];
};

function UserActionsCell({
  user,
  t,
}: {
  user: AdminUserListItem;
  t: (key: string) => string;
}) {
  const router = useRouter();
  const [banDialogOpen, setBanDialogOpen] = useState(false);

  const isAdminUser = user?.role === "ADMIN";
  const displayName = user?.name || user?.email;

  const { mutate: banUser, isPending } = useBanUser({
    onSuccessCallback: () => setBanDialogOpen(false),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${user.id}`)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Eye className="h-4 w-4 text-primary" />
            <span>{t("actions.viewDetails")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => !isAdminUser && setBanDialogOpen(true)}
            disabled={isAdminUser}
            className={cn(
              "gap-2 py-2 rounded-xl text-xs font-bold transition-colors",
              isAdminUser
                ? "opacity-40 cursor-not-allowed text-muted-foreground"
                : "cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-500/10",
            )}
          >
            <ShieldOff className="h-4 w-4" />
            <span>{t("actions.banUser")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={banDialogOpen}
        onOpenChange={setBanDialogOpen}
        variant="destructive"
        icon={ShieldOff}
        title={t("confirmBan.title")}
        confirmLabel={t("confirmBan.confirm")}
        cancelLabel={t("confirmBan.cancel")}
        isPending={isPending}
        onConfirm={() => banUser(user.id)}
        description={
          <>
            {t("confirmBan.description")}
            {displayName && (
              <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
                {displayName}
              </span>
            )}
          </>
        }
      />
    </>
  );
}
