"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { Link } from "@/i18n/routing";
import { useMyEnrolledCourses } from "@/services";
import { ArrowLeft, BookOpen, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function OverviewRecentCourses() {
  const t = useTranslations("dashboard");

  const { data, isLoading, isError, isFetching, refetch } =
    useMyEnrolledCourses({ page: 1, limit: 3 });
  const items = data?.data?.items ?? [];

  return (
    <section
      aria-labelledby="recent-courses-title"
      className="flex flex-col gap-4 p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-border/60">
        <h2
          id="recent-courses-title"
          className="text-sm font-black text-foreground flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>{t("menu.myCourses")}</span>
        </h2>
        <Link
          href="/dashboard/my-courses"
          className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          <span>{t("viewAll")}</span>
          <ArrowLeft className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <DashboardQueryError
          compact
          onRetry={() => void refetch()}
          isRetrying={isFetching}
        />
      ) : items?.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center gap-2">
          <BookOpen className="h-10 w-10 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground">{t("empty.courses")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items?.map((enrollment) => (
            <Link
              key={enrollment?.id}
              href={`/courses/${enrollment?.course?.slug}`}
              className="group flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/40 transition-colors"
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                {enrollment?.course?.imageUrl ? (
                  <Image
                    src={enrollment?.course?.imageUrl}
                    alt={enrollment?.course?.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {enrollment?.course?.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {enrollment?.course?.teacher?.name}
                </p>
              </div>
              <PlayCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
