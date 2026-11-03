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
import { useAdminTransactions } from "@/services";
import { GetAdminTransactionsParams, TX_STATUSES, TX_TYPES } from "@/types";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getTransactionsColumns } from "./columns";
import { TransactionsFilters } from "./TransactionsFilters";

export function AdminTransactionsClient() {
  const t = useTranslations("admin.wallets");
  const locale = useLocale();

  const {
    params,
    apiParams,
    setPage,
    setLimit,
    setFilter,
    resetFilters,
    sorting,
    onSortingChange,
  } = useAdminTableParams<GetAdminTransactionsParams>({
    customParsers: {
      status: parseAsStringEnum([...TX_STATUSES]),
      type: parseAsStringEnum([...TX_TYPES]),
    },
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useAdminTransactions(apiParams);

  const transactions = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getTransactionsColumns({
    t,
    locale,
    page: params?.page,
    limit: params?.limit,
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("transactions.pageTitle")}
        subtitle={
          pagination?.total
            ? t("transactions.transactionsCount", { count: pagination.total })
            : t("transactions.pageSubtitle")
        }
        icon={ArrowLeftRight}
        iconColor="bg-amber-500/10 text-amber-600"
        actions={
          <Link
            href="/admin/wallets"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-md h-9 gap-2 cursor-pointer shadow-xs",
            )}
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("actions.backToWallets")}</span>
          </Link>
        }
      />

      <TransactionsFilters
        status={params.status}
        type={params.type}
        sortBy={params.sortBy}
        order={params.order}
        onStatusChange={(v) => setFilter("status", v)}
        onTypeChange={(v) => setFilter("type", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        key={`${params.sortBy}-${params.order}`}
        columns={columns}
        data={transactions}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        sorting={sorting}
        onSortingChange={onSortingChange}
        emptyStateMessage={t("table.noTransactionsFound")}
        emptyStateDescription={t("table.noTransactionsDescription")}
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
