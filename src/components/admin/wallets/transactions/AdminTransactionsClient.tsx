"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminTransactions } from "@/services";
import type { TransactionStatus, TransactionType } from "@/types";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getTransactionsColumns } from "../list/columns";
import { TransactionsFilters } from "./TransactionsFilters";

export function AdminTransactionsClient() {
  const t = useTranslations("admin.wallets");
  const locale = useLocale();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    status: parseAsString.withDefault(""),
    type: parseAsString.withDefault(""),
  });

  const { data, isLoading, isFetching } = useAdminTransactions({
    page: params.page,
    limit: params.limit,
    status: (params.status as TransactionStatus) || undefined,
    type: (params.type as TransactionType) || undefined,
  });

  const transactions = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getTransactionsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
  });

  const handleResetFilters = () => {
    setParams({
      status: null,
      type: null,
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-xs">
            <ArrowLeftRight className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("transactions.pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("transactions.transactionsCount", {
                    count: pagination.total,
                  })
                : t("transactions.pageSubtitle")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/wallets"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("actions.backToWallets")}</span>
        </Link>
      </div>

      <TransactionsFilters
        status={params.status}
        type={params.type}
        onStatusChange={(v) =>
          setParams({ status: v === "all" ? null : v, page: 1 })
        }
        onTypeChange={(v) =>
          setParams({ type: v === "all" ? null : v, page: 1 })
        }
        onResetFilters={handleResetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={transactions}
        isLoading={isLoading}
        enableSorting
        emptyStateMessage={t("table.noTransactionsFound")}
        emptyStateDescription={t("table.noTransactionsDescription")}
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
