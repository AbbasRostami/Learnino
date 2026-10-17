"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useAdminTeachers } from "@/services";
import {
  GetAdminTeachersParams,
  VISIBILITY_OPTIONS,
  type TeacherListItem,
} from "@/types";
import { GraduationCap, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { useState } from "react";
import { TeacherFormDialog } from "../form/TeacherFormDialog";
import { getTeachersColumns } from "./columns";
import { TeachersFilters } from "./TeachersFilters";

export function AdminTeachersClient() {
  const t = useTranslations("admin.teachers");
  const locale = useLocale();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeacherListItem | null>(null);

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminTeachersParams>({
    customParsers: {
      show: parseAsStringEnum([...VISIBILITY_OPTIONS]),
    },
  });

  const { data, isLoading, isFetching } = useAdminTeachers(apiParams);

  const teachers = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const handleEdit = (teacher: TeacherListItem) => {
    setEditTarget(teacher);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const columns = getTeachersColumns({
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
            ? t("teachersCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={GraduationCap}
        actions={
          <Button
            onClick={handleCreate}
            className="rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4" />
            <span>{t("createNew")}</span>
          </Button>
        }
      />
      <TeachersFilters
        search={searchValue}
        show={params.show}
        onSearchChange={setSearch}
        onShowChange={(v) => setFilter("show", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={teachers}
        isLoading={isLoading}
        enableSorting
        emptyStateMessage={t("table.noTeachersFound")}
        emptyStateDescription={t("table.noTeachersDescription")}
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

      <TeacherFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        teacher={editTarget}
      />
    </div>
  );
}
