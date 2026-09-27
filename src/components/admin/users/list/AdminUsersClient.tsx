"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useUsers } from "@/services";
import { ShieldOff, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getUsersColumns } from "./columns";
import { UsersFilters } from "./UsersFilters";
import { UsersStatsSection } from "./UsersStatsSection";

export function AdminUsersClient() {
  const t = useTranslations("admin.users");

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    role: parseAsString.withDefault(""),
    isVerified: parseAsString.withDefault(""),
    sortBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
  });

  const { data, isLoading, isFetching } = useUsers({
    page: params?.page,
    limit: params?.limit,
    search: params?.search || undefined,
    role: (params?.role as "USER" | "ADMIN") || undefined,
    isVerified: (params?.isVerified as "true" | "false") || undefined,
    sortBy: params?.sortBy as "createdAt" | "name" | "email",
    order: params?.order as "asc" | "desc",
  });

  const users = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const handleSortChange = (field: string) => {
    if (params.sortBy === field) {
      setParams({
        order: params.order === "asc" ? "desc" : "asc",
        page: 1,
      });
    } else {
      setParams({
        sortBy: field,
        order: "desc",
        page: 1,
      });
    }
  };

  const columns = getUsersColumns({
    t,
    sortBy: params.sortBy,
    order: params.order,
    onSortChange: handleSortChange,
    page: params.page,
    limit: params.limit,
  });

  const handleResetFilters = () => {
    setParams({
      search: null,
      role: null,
      isVerified: null,
      sortBy: "createdAt",
      order: "desc",
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("usersRegistered", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

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
      </div>

      <UsersStatsSection />

      <UsersFilters
        search={params.search}
        role={params.role}
        isVerified={params.isVerified}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={(value) =>
          setParams({ search: value || null, page: 1 })
        }
        onRoleChange={(value) =>
          setParams({ role: value === "all" ? null : value, page: 1 })
        }
        onVerifiedChange={(value) =>
          setParams({ isVerified: value === "all" ? null : value, page: 1 })
        }
        onSortByChange={(value) => setParams({ sortBy: value, page: 1 })}
        onOrderChange={(value) => setParams({ order: value, page: 1 })}
        onResetFilters={handleResetFilters}
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
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
