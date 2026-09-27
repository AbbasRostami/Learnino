"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { Button } from "@/components/ui/button";
import { useDiscounts } from "@/services";
import { Percent, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { DiscountFormDialog } from "../form/DiscountFormDialog";
import { getDiscountsColumns } from "./columns";
import { DiscountsFilters } from "./DiscountsFilters";

export function AdminDiscountsClient() {
  const t = useTranslations("admin.discounts");
  const locale = useLocale();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    active: parseAsString.withDefault(""),
  });

  const [formOpen, setFormOpen] = useState(false);

  const { data, isLoading, isFetching } = useDiscounts({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    active: (params.active as "true" | "false") || undefined,
  });

  const discounts = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getDiscountsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
  });

  const handleResetFilters = () => {
    setParams({ search: null, active: null, page: 1 });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <Percent className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("discountsCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

        <Button
          onClick={() => setFormOpen(true)}
          className="rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{t("createNew")}</span>
        </Button>
      </div>

      <DiscountsFilters
        search={params.search}
        active={params.active}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onActiveChange={(v) =>
          setParams({ active: v === "all" ? null : v, page: 1 })
        }
        onResetFilters={handleResetFilters}
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
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}

      <DiscountFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
