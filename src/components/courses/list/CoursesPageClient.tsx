"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useInfiniteCourses } from "@/services";
import type { GetCoursesParams, GetCoursesResponse } from "@/types";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";

import { CourseCardSkeleton } from "./CourseCardSkeleton";
import { CoursesFilters } from "./CoursesFilters";
import { CoursesFiltersMobile } from "./CoursesFiltersMobile";
import { CoursesListCard } from "./CoursesListCard";
import { CoursesToolbar } from "./CoursesToolbar";
import { EmptyCoursesState } from "./EmptyCoursesState";

interface CoursesPageClientProps {
  initialData?: GetCoursesResponse["data"];
}

export function CoursesPageClient({ initialData }: CoursesPageClientProps) {
  const t = useTranslations("course");

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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteCourses(apiParams);

  const hasActiveFilters = Boolean(
    (params.categories && params.categories.length > 0) ||
    params.level ||
    params.minPrice != null ||
    params.maxPrice != null ||
    (searchValue && searchValue.trim().length > 0),
  );

  const courses =
    data?.pages.flatMap((page) => page?.data?.items ?? []) ??
    (!hasActiveFilters ? (initialData?.items ?? []) : []);

  const totalResults =
    data?.pages[0]?.data?.pagination?.total ??
    (!hasActiveFilters ? initialData?.pagination?.total : undefined) ??
    0;

  const showSkeleton = isLoading || (isFetching && !data);
  const isEmpty = !showSkeleton && courses.length === 0;

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
            resultsCount={totalResults}
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
          ) : isEmpty ? (
            <EmptyCoursesState
              hasActiveFilters={hasActiveFilters}
              onResetFilters={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {courses?.map((course, index) => (
                <CoursesListCard
                  key={course?.id}
                  course={course}
                  priority={index < 3}
                  index={index}
                />
              ))}
            </div>
          )}

          {hasNextPage && !showSkeleton && !isEmpty && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-full px-8 gap-2 shadow-xs hover:shadow-md transition-shadow font-bold cursor-pointer"
              >
                {isFetchingNextPage && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                <span>{t("loadMore")}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
