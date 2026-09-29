"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { useRouter } from "@/i18n/routing";
import { useAdminOrders } from "@/services";
import type { OrderStatus } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getOrdersColumns } from "./columns";
import { OrdersFilters } from "./OrdersFilters";

export function AdminOrdersClient() {
  const t = useTranslations("admin.orders");
  const locale = useLocale();
  const router = useRouter();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const { data, isLoading, isFetching } = useAdminOrders({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    status: (params.status as OrderStatus) || undefined,
  });

  const orders = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  const columns = getOrdersColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onViewDetails: handleViewDetails,
  });

  const handleResetFilters = () => {
    setParams({ search: null, status: null, page: 1 });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("ordersCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>
      </div>

      <OrdersFilters
        search={params.search}
        status={params.status}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onStatusChange={(v) =>
          setParams({ status: v === "all" ? null : v, page: 1 })
        }
        onResetFilters={handleResetFilters}
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
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
