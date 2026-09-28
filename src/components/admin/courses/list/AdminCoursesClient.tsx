"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminCourses } from "@/services";
import type { Course, CourseLevel } from "@/types";
import { BookOpen, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getCoursesColumns } from "./columns";
import { CoursesFilters } from "./CoursesFilters";

export function AdminCoursesClient() {
  const t = useTranslations("admin.courses");
  const locale = useLocale();
  const router = useRouter();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    level: parseAsString.withDefault(""),
    published: parseAsString.withDefault(""),
    sortBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
  });

  const { data, isLoading, isFetching } = useAdminCourses({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    level: (params.level as CourseLevel) || undefined,
    published: (params.published as "true" | "false") || undefined,
    sortBy:
      (params.sortBy as "createdAt" | "price" | "titleFa" | "titleEn") ||
      "createdAt",
    order: (params.order as "asc" | "desc") || "desc",
  });

  const courses = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

   const handleEdit = (course: Course) => {
    router.push(`/admin/courses/${course.slug || course.id}`);
  };

  const handleSortChange = (field: string) => {
    if (params.sortBy === field) {
      setParams({
        order: params.order === "asc" ? "desc" : "asc",
        page: 1,
      });
    } else {
      setParams({ sortBy: field, order: "desc", page: 1 });
    }
  };

  const columns = getCoursesColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    sortBy: params.sortBy,
    order: params.order,
    onSortChange: handleSortChange,
    onEdit: handleEdit,
  });

  const handleResetFilters = () => {
    setParams({
      search: null,
      level: null,
      published: null,
      sortBy: "createdAt",
      order: "desc",
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("coursesCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

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
      </div>

      <CoursesFilters
        search={params.search}
        level={params.level}
        published={params.published}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onLevelChange={(v) =>
          setParams({ level: v === "all" ? null : v, page: 1 })
        }
        onPublishedChange={(v) =>
          setParams({ published: v === "all" ? null : v, page: 1 })
        }
        onSortByChange={(v) => setParams({ sortBy: v, page: 1 })}
        onOrderChange={(v) => setParams({ order: v, page: 1 })}
        onResetFilters={handleResetFilters}
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
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
