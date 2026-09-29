"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { Button } from "@/components/ui/button";
import { useAdminTeachers } from "@/services";
import type { TeacherListItem } from "@/types";
import { GraduationCap, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { TeacherFormDialog } from "../form/TeacherFormDialog";
import { getTeachersColumns } from "./columns";
import { TeachersFilters } from "./TeachersFilters";

export function AdminTeachersClient() {
  const t = useTranslations("admin.teachers");
  const locale = useLocale();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    show: parseAsString.withDefault(""),
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeacherListItem | null>(null);

  const { data, isLoading, isFetching } = useAdminTeachers({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    show: (params.show as "true" | "false") || undefined,
  });

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

  const handleResetFilters = () => {
    setParams({ search: null, show: null, page: 1 });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("teachersCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

        <Button
          onClick={handleCreate}
          className="rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>{t("createNew")}</span>
        </Button>
      </div>

      <TeachersFilters
        search={params.search}
        show={params.show}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onShowChange={(v) =>
          setParams({ show: v === "all" ? null : v, page: 1 })
        }
        onResetFilters={handleResetFilters}
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
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
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