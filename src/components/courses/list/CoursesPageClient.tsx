"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useCourses } from "@/services";
import type { Course, GetCoursesParams, GetCoursesResponse } from "@/types";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";
import { useState } from "react";

import { CourseCardSkeleton } from "./CourseCardSkeleton";
import { CoursesFilters } from "./CoursesFilters";
import { CoursesFiltersMobile } from "./CoursesFiltersMobile";
import { CoursesListCard } from "./CoursesListCard";
import { CoursesToolbar } from "./CoursesToolbar";

interface CoursesPageClientProps {
  initialData?: GetCoursesResponse["data"];
}

export function CoursesPageClient({ initialData }: CoursesPageClientProps) {
  const t = useTranslations("course");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const {
    params,
    searchValue,
    apiParams,
    setSearch,
    setFilter,
    setParams,
    resetFilters,
  } = useAdminTableParams<GetCoursesParams>({
    defaultLimit: 12,
    customParsers: {
      categories: parseAsArrayOf(parseAsString).withDefault([]),
      level: parseAsString.withDefault(""),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
    },
  });

  const { data, isLoading, isFetching } = useCourses({
    ...apiParams,
    page: hasLoadedMore ? undefined : params.page,
  });

  const currentData = data?.data ?? initialData;
  const courses = hasLoadedMore ? allCourses : (currentData?.items ?? []);
  const pagination = currentData?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;
  const hasMore = pagination ? params.page < totalPages : false;

  const showSkeleton = isLoading && !initialData;

  const handleLoadMore = () => {
    setHasLoadedMore(true);
    setAllCourses([...courses, ...(data?.data?.items ?? [])]);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <AppBreadcrumb className="mb-6" />

      <div className="flex flex-col items-center text-center gap-4 mb-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-xs">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("pageBadge")}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
              {t("pageTitle")}
            </span>
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <CoursesFilters
              categories={params.categories}
              level={params.level}
              minPrice={params.minPrice}
              maxPrice={params.maxPrice}
              onCategoriesChange={(val) => setFilter("categories", val)}
              onLevelChange={(val) => setFilter("level", val)}
              onMinPriceChange={(val) => setFilter("minPrice", val)}
              onMaxPriceChange={(val) => setFilter("maxPrice", val)}
              onResetFilters={resetFilters}
            />
          </div>
        </aside>

        <div className="min-w-0">
          <CoursesToolbar
            resultsCount={pagination?.total ?? 0}
            searchValue={searchValue}
            sortBy={params.sortBy}
            order={params.order}
            onSearchChange={setSearch}
            onSortChange={(sortBy, order) =>
              setParams({ sortBy, order, page: 1 })
            }
            mobileFiltersSlot={
              <CoursesFiltersMobile
                categories={params.categories}
                level={params.level}
                minPrice={params.minPrice}
                maxPrice={params.maxPrice}
                onCategoriesChange={(val) => setFilter("categories", val)}
                onLevelChange={(val) => setFilter("level", val)}
                onMinPriceChange={(val) => setFilter("minPrice", val)}
                onMaxPriceChange={(val) => setFilter("maxPrice", val)}
                onResetFilters={resetFilters}
              />
            }
          />

          {showSkeleton ? (
            <CourseCardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {courses.map((course, index) => (
                <CoursesListCard
                  key={course.id}
                  course={course}
                  priority={index < 3}
                  index={index}
                />
              ))}
            </div>
          )}

          {hasMore && !showSkeleton && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={isFetching}
                className="rounded-full px-8 gap-2 shadow-xs hover:shadow-md transition-shadow font-bold cursor-pointer"
              >
                {isFetching && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{t("loadMore")}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
