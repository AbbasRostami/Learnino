"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { buttonVariants } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useUsers } from "@/services";
import { ListUsersParams, USER_ROLES, VERIFICATION_STATUSES } from "@/types";
import { ShieldOff, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getUsersColumns } from "./columns";
import { UsersFilters } from "./UsersFilters";
import { UsersStatsSection } from "./UsersStatsSection";

export function AdminUsersClient() {
  const t = useTranslations("admin.users");
  const locale = useLocale();

  const {
    params,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    setSort,
    resetFilters,
  } = useAdminTableParams<ListUsersParams>({
    customParsers: {
      role: parseAsStringEnum([...USER_ROLES]),
      isVerified: parseAsStringEnum([...VERIFICATION_STATUSES]),
    },
  });

  const { data, isLoading, isFetching } = useUsers(apiParams);
  const users = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getUsersColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("usersRegistered", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={Users}
        actions={
          <Link
            href="/admin/users/banned"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl h-11 gap-2 border-rose-500/30 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 cursor-pointer",
            )}
          >
            <ShieldOff className="h-4 w-4" />
            <span>{t("actions.goToBanned")}</span>
          </Link>
        }
      />

      <UsersStatsSection />

      <UsersFilters
        search={params.search}
        role={params.role}
        isVerified={params.isVerified}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={setSearch}
        onRoleChange={(v) => setFilter("role", v)}
        onVerifiedChange={(v) => setFilter("isVerified", v)}
        onSortByChange={(v) => setFilter("sortBy", v)}
        onOrderChange={(v) => setFilter("order", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        emptyStateMessage={t("table.noUsersFound")}
        emptyStateDescription={t("table.noUsersDescription")}
      />

      {pagination && pagination.total > 0 && (
        <AdminPagination
          currentPage={params.page}
          limit={params.limit}
          totalCount={pagination.total}
          onPageChange={setPage}
          onLimitChange={setLimit}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
