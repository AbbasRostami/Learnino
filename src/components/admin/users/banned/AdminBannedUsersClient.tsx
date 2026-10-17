"use client";

import { AdminDataTable, AdminPagination } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useBannedUsers } from "@/services";
import { BannedUser } from "@/types";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowLeft, Calendar, Mail, ShieldOff, UserCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useState } from "react";
import { UnbanUserDialog } from "./UnbanUserDialog";

export function AdminBannedUsersClient() {
  const t = useTranslations("admin.users");
  const locale = useLocale();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });

  const [selectedUser, setSelectedUser] = useState<BannedUser | null>(null);

  const { data, isLoading, isFetching } = useBannedUsers({
    page: params?.page,
    limit: params?.limit,
  });

  const users = (data?.data?.items ?? []) as BannedUser[];
  const pagination = data?.data?.pagination;

  const columns: ColumnDef<BannedUser>[] = [
    {
      id: "rowNumber",
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => {
        const rowNum = (params.page - 1) * params.limit + row.index + 1;

        return (
          <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
            {formatNumber(rowNum, locale)}
          </span>
        );
      },
    },
    {
      id: "user",
      header: () => <span>{t("table.user")}</span>,
      cell: ({ row }) => {
        const user = row?.original;
        const displayName =
          user?.name || user?.email?.split("@")?.[0] || t("detail.noName");
        const avatarInitial = (user?.name || user?.email || "?")
          .charAt(0)
          ?.toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-55">
            <Avatar className="h-10 w-10 border border-rose-500/30 grayscale shadow-xs">
              <AvatarImage src={user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-rose-500/10 text-rose-600 font-black text-xs">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground line-through opacity-70 truncate">
                {displayName}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                dir="ltr"
              >
                #{user?.id.slice(0, 8)}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "contact",
      header: () => <span>{t("table.contact")}</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
          <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="truncate" dir="ltr">
            {row?.original?.email}
          </span>
        </div>
      ),
    },
    {
      id: "bannedAt",
      header: () => <span>{t("detail.status")}</span>,
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1 text-xs font-black text-rose-600 dark:text-rose-400">
            <ShieldOff className="h-3.5 w-3.5" />
            <span>{t("detail.banned")}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            {t("detail.bannedSince")}{" "}
            {formatRelativeTime(row?.original?.bannedAt, locale)}
          </span>
        </div>
      ),
    },
    {
      id: "createdAt",
      header: () => <span>{t("table.joined")}</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span>{formatRelativeTime(row?.original?.createdAt, locale)}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedUser(row?.original)}
          className="rounded-xl h-9 px-3 gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer shadow-xs"
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>{t("actions.unbanUser")}</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 shadow-xs">
            <ShieldOff className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("banned.pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("banned.bannedCount", { count: pagination.total })
                : t("banned.pageSubtitle")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/users"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("actions.goToList")}</span>
        </Link>
      </div>

      <AdminDataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        emptyStateMessage={t("banned.noBannedUsers")}
        emptyStateDescription={t("banned.noBannedUsersDescription")}
      />

      {pagination && pagination.total > 0 && (
        <AdminPagination
          currentPage={params.page}
          limit={params.limit}
          totalCount={pagination.total}
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}

      {selectedUser && (
        <UnbanUserDialog
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          userId={selectedUser?.id}
          userName={selectedUser?.name || selectedUser?.email}
        />
      )}
    </div>
  );
}
