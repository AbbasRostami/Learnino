"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { buttonVariants } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminCourses } from "@/services";
import {
  COURSE_LEVELS,
  COURSE_PUBLISHED,
  type Course,
  type GetAdminCoursesParams,
} from "@/types";
import { BookOpen, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getCoursesColumns } from "./columns";
import { CoursesFilters } from "./CoursesFilters";

export function AdminCoursesClient() {
  const t = useTranslations("admin.courses");
  const locale = useLocale();
  const router = useRouter();

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminCoursesParams>({
    customParsers: {
      level: parseAsStringEnum([...COURSE_LEVELS]),
      published: parseAsStringEnum([...COURSE_PUBLISHED]),
    },
  });

  const { data, isLoading, isFetching } = useAdminCourses(apiParams);

  const courses = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getCoursesColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onEdit: (course: Course) =>
      router.push(`/admin/courses/${course?.slug || course?.id}`),
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("coursesCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={BookOpen}
        actions={
          <Link
            href="/admin/courses/create"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white",
            )}
          >
            <Plus className="h-4 w-4" />
            <span>{t("createNew")}</span>
          </Link>
        }
      />

      <CoursesFilters
        search={searchValue}
        level={params.level}
        published={params.published}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={setSearch}
        onLevelChange={(v) => setFilter("level", v)}
        onPublishedChange={(v) => setFilter("published", v)}
        onSortByChange={(v) => setFilter("sortBy", v)}
        onOrderChange={(v) => setFilter("order", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={courses}
        isLoading={isLoading}
        emptyStateMessage={t("table.noCoursesFound")}
        emptyStateDescription={t("table.noCoursesDescription")}
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
