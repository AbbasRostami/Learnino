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
import { useAdminWallets } from "@/services";
import { GetAdminWalletsParams } from "@/types";
import { ArrowLeftRight, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger } from "nuqs";
import { getWalletsColumns } from "./columns";
import { WalletsFilters } from "./WalletsFilters";

export function AdminWalletsClient() {
  const t = useTranslations("admin.wallets");
  const locale = useLocale();

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminWalletsParams>({
    customParsers: {
      minBalance: parseAsInteger,
      maxBalance: parseAsInteger,
    },
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useAdminWallets(apiParams);

  const wallets = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getWalletsColumns({
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
            ? t("walletsCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={Wallet}
        actions={
          <Link
            href="/admin/wallets/transactions"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-md h-9 gap-2 cursor-pointer shadow-xs border-primary/20 text-primary hover:bg-primary/10",
            )}
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>{t("actions.viewTransactions")}</span>
          </Link>
        }
      />

      <WalletsFilters
        search={searchValue}
        minBalance={params.minBalance}
        maxBalance={params.maxBalance}
        onSearchChange={setSearch}
        onMinBalanceChange={(v) => setFilter("minBalance", v)}
        onMaxBalanceChange={(v) => setFilter("maxBalance", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={wallets}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        enableSorting
        emptyStateMessage={t("table.noWalletsFound")}
        emptyStateDescription={t("table.noWalletsDescription")}
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
