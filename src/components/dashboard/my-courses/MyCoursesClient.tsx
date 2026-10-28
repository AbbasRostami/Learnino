"use client";

import { DashboardPagination } from "@/components/dashboard/shared/DashboardPagination";
import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { useMyEnrolledCourses } from "@/services";
import { formatRelativeTime } from "@/utils/formatters";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  PlayCircle,
  Tag,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { MyCoursesCardSkeleton } from "./MyCoursesCardSkeleton";

export function MyCoursesClient() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } =
    useMyEnrolledCourses({ page, limit: 6 });
  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination?.total / pagination?.limit)
    : 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">
              {t("menu.myCourses")}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {pagination?.total
                ? t("activeCoursesInAccount", { count: pagination?.total })
                : ""}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <MyCoursesCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <DashboardQueryError
          onRetry={() => void refetch()}
          isRetrying={isFetching}
        />
      ) : items?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4 rounded-3xl border border-dashed border-border/60 bg-card/40">
          <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm font-bold text-muted-foreground">
            {t("empty.courses")}
          </p>
          <Button className="rounded-full px-6 gap-2 cursor-pointer">
            <Link href="/courses">
              <span>{t("empty.browseCourses")}</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items?.map((enrollment, index) => {
            const course = enrollment?.course;

            return (
              <motion.article
                key={enrollment?.id}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 15 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <Link
                  href={`/courses/${course?.slug}`}
                  className="relative aspect-16/10 w-full overflow-hidden bg-muted"
                >
                  {course?.imageUrl ? (
                    <Image
                      src={course?.imageUrl}
                      alt={course?.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white shadow-xl" />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {course?.category && (
                      <Link
                        href={`/courses?categories=${course?.category?.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                        <span>{course?.category?.name}</span>
                      </Link>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatRelativeTime(enrollment?.enrolledAt, locale)}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors min-h-12">
                    <Link
                      href={`/courses/${course?.slug}`}
                      className="hover:underline underline-offset-2"
                    >
                      {course?.title}
                    </Link>
                  </h2>

                  <div className="mt-auto pt-4 border-t border-dashed border-border/60 flex items-center justify-between gap-2">
                    {course.teacher ? (
                      <Link
                        href={`/teachers/${course?.teacher?.slug}`}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0 hover:text-primary transition-colors group/teacher"
                      >
                        <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate font-semibold group-hover/teacher:underline underline-offset-2">
                          {course?.teacher?.name}
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                        <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate font-semibold">
                          {t("defaultTeacherName")}
                        </span>
                      </div>
                    )}

                    <Button
                      size="sm"
                      className="rounded-xl h-9 px-3 text-xs font-bold gap-1 shadow-md shadow-primary/20 shrink-0 cursor-pointer"
                    >
                      <Link
                        href={`/courses/${course?.slug}`}
                        className="inline-flex items-center gap-1"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        <span>{t("details")}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <DashboardPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  );
}
