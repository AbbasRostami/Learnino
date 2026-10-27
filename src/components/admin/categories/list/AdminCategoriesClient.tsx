"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useAdminCategories } from "@/services";
import {
  VISIBILITY_OPTIONS,
  type AdminCategoriesParams,
  type CategoryWithCount,
} from "@/types";
import { FolderTree, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { useState } from "react";
import { CategoryFormDialog } from "../form/CategoryFormDialog";
import { CategoriesFilters } from "./CategoriesFilters";
import { getCategoriesColumns } from "./columns";

export function AdminCategoriesClient() {
  const t = useTranslations("admin.categories");
  const locale = useLocale();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryWithCount | null>(null);

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<AdminCategoriesParams>({
    customParsers: {
      show: parseAsStringEnum([...VISIBILITY_OPTIONS]),
    },
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useAdminCategories(apiParams);

  const categories = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const handleEdit = (category: CategoryWithCount) => {
    setEditTarget(category);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const columns = getCategoriesColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onEdit: handleEdit,
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("categoriesCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={FolderTree}
        actions={
          <Button
            onClick={handleCreate}
            className="rounded-md h-9 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4" />
            <span>{t("createNew")}</span>
          </Button>
        }
      />

      <CategoriesFilters
        search={searchValue}
        show={params.show}
        onSearchChange={setSearch}
        onShowChange={(v) => setFilter("show", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={categories}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        enableSorting
        emptyStateMessage={t("table.noCategoriesFound")}
        emptyStateDescription={t("table.noCategoriesDescription")}
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

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editTarget}
      />
    </div>
  );
}
