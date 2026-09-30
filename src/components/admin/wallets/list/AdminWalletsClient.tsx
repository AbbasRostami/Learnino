"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminWallets } from "@/services";
import { ArrowLeftRight, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getWalletsColumns } from "./columns";
import { WalletsFilters } from "./WalletsFilters";

export function AdminWalletsClient() {
  const t = useTranslations("admin.wallets");
  const locale = useLocale();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    minBalance: parseAsInteger.withDefault(0),
    maxBalance: parseAsInteger.withDefault(0),
  });

  const { data, isLoading, isFetching } = useAdminWallets({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    minBalance: params.minBalance || undefined,
    maxBalance: params.maxBalance || undefined,
  });

  const wallets = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getWalletsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
  });

  const handleResetFilters = () => {
    setParams({
      search: null,
      minBalance: null,
      maxBalance: null,
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <Wallet className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("walletsCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/wallets/transactions"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs border-primary/20 text-primary hover:bg-primary/10",
          )}
        >
          <ArrowLeftRight className="h-4 w-4" />
          <span>{t("actions.viewTransactions")}</span>
        </Link>
      </div>

      <WalletsFilters
        search={params.search}
        minBalance={params.minBalance}
        maxBalance={params.maxBalance}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onMinBalanceChange={(v) => setParams({ minBalance: v, page: 1 })}
        onMaxBalanceChange={(v) => setParams({ maxBalance: v, page: 1 })}
        onResetFilters={handleResetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={wallets}
        isLoading={isLoading}
        enableSorting
        emptyStateMessage={t("table.noWalletsFound")}
        emptyStateDescription={t("table.noWalletsDescription")}
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
