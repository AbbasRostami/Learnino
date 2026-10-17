"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useDiscounts } from "@/services";
import { DISCOUNT_ACTIVE, GetDiscountsParams } from "@/types";
import { Percent, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { useState } from "react";
import { DiscountFormDialog } from "../form/DiscountFormDialog";
import { getDiscountsColumns } from "./columns";
import { DiscountsFilters } from "./DiscountsFilters";

export function AdminDiscountsClient() {
  const t = useTranslations("admin.discounts");
  const locale = useLocale();
  const [formOpen, setFormOpen] = useState(false);

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetDiscountsParams>({
    customParsers: {
      active: parseAsStringEnum([...DISCOUNT_ACTIVE]),
    },
  });

  const { data, isLoading, isFetching } = useDiscounts(apiParams);

  const discounts = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getDiscountsColumns({
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
            ? t("discountsCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={Percent}
        actions={
          <Button
            onClick={() => setFormOpen(true)}
            className="rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4" />
            <span>{t("createNew")}</span>
          </Button>
        }
      />

      <DiscountsFilters
        search={searchValue}
        active={params.active}
        onSearchChange={setSearch}
        onActiveChange={(v) => setFilter("active", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={discounts}
        isLoading={isLoading}
        enableSorting
        emptyStateMessage={t("table.noDiscountsFound")}
        emptyStateDescription={t("table.noDiscountsDescription")}
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

      <DiscountFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
