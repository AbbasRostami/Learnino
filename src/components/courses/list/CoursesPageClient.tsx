"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/services";
import type { Course, GetCoursesResponse } from "@/types";
import { BookOpen, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useState } from "react";
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

  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    level: parseAsString.withDefault(""),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
    sortBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
  });

  const { data, isLoading, isFetching } = useCourses({
    page: hasLoadedMore ? undefined : params.page,
    limit: 12,
    search: params.search || undefined,
    categories: params.categories.length ? params.categories : undefined,
    level:
      (params.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED") || undefined,
    minPrice: params.minPrice ?? undefined,
    maxPrice: params.maxPrice ?? undefined,
    sortBy: params.sortBy as "createdAt" | "price" | "titleFa" | "titleEn",
    order: params.order as "asc" | "desc",
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("pageBadge")}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
              {t("pageTitle")}
            </span>
            <svg
              className="absolute -bottom-1 sm:-bottom-2 inset-s-0 w-full text-brand-accent/40"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q75 2 150 8 T298 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          {t("pageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <CoursesFilters />
          </div>
        </aside>

        <div className="min-w-0">
          <CoursesToolbar
            resultsCount={pagination?.total ?? 0}
            mobileFiltersSlot={<CoursesFiltersMobile />}
          />

          {showSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-3xl border border-border/50 bg-card animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 rounded-3xl border border-dashed border-border/60 bg-muted/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted">
                <BookOpen
                  className="h-10 w-10 text-muted-foreground/40"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground mb-1">
                  {t("noResults")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("tryDifferentFilters")}
                </p>
              </div>
            </div>
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
                className="rounded-full px-8 gap-2 shadow-sm hover:shadow-md transition-shadow"
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
