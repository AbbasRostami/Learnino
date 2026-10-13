"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useRouter } from "@/i18n/routing";
import { useAdminOrders } from "@/services";
import { GetAdminOrdersParams, ORDER_STATUSES } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getOrdersColumns } from "./columns";
import { OrdersFilters } from "./OrdersFilters";

export function AdminOrdersClient() {
  const t = useTranslations("admin.orders");
  const locale = useLocale();
  const router = useRouter();

  const {
    params,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminOrdersParams>({
    customParsers: {
      status: parseAsStringEnum([...ORDER_STATUSES]),
    },
  });

  const { data, isLoading, isFetching } = useAdminOrders(apiParams);

  const orders = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getOrdersColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onViewDetails: (id) => router.push(`/admin/orders/${id}`),
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("ordersCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={ShoppingBag}
      />
      <OrdersFilters
        search={params.search}
        status={params.status}
        onSearchChange={setSearch}
        onStatusChange={(v) => setFilter("status", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        enableSorting
        emptyStateMessage={t("table.noOrdersFound")}
        emptyStateDescription={t("table.noOrdersDescription")}
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
