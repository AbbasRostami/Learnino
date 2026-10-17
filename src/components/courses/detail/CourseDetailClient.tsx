"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { useCourse } from "@/services";
import type { Course } from "@/types";
import { formatNumber, formatRelativeTime } from "@/utils/formatters";
import { BarChart3, Calendar, Tag, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CourseActionButtons } from "./CourseActionButtons";
import { CourseFeatures } from "./CourseFeatures";
import { CoursePriceCard } from "./CoursePriceCard";
import { CourseTeacherCard } from "./CourseTeacherCard";
import { CourseCommentsSection } from "./comments/CourseCommentsSection";

interface CourseDetailClientProps {
  slug: string;
  initialCourse: Course;
}

export function CourseDetailClient({
  slug,
  initialCourse,
}: CourseDetailClientProps) {
  const t = useTranslations("course");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const { data, isLoading, isFetching } = useCourse(slug, initialCourse);
  const course = data?.data?.course ?? initialCourse;
  const style = course?.category
    ? getCategoryStyle(course?.category?.slug)
    : null;

  const breadcrumbItems = [
    { label: tNav("courses"), href: "/courses" },
    ...(course?.category
      ? [
          {
            label: course?.category?.name,
            href: `/courses?categories=${course?.category?.slug}`,
          },
        ]
      : []),
    { label: course?.title },
  ];

  return (
    <div itemScope itemType="https://schema.org/Course" className="relative">
      <div
        className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-primary/10 via-brand-accent/5 to-background -z-10 dark:from-primary/5 dark:via-brand-accent/5 dark:to-background"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AppBreadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12">
          <div className="min-w-0">
            {course?.category && style && (
              <Link
                href={`/courses?categories=${course?.category?.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 transition-colors hover:opacity-80 shadow-sm border border-border/50 backdrop-blur-md",
                  style.badgeColor,
                )}
              >
                <Tag className="h-3 w-3" aria-hidden="true" />
                <span>{course?.category?.name}</span>
              </Link>
            )}

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4"
              itemProp="name"
            >
              {course?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-8 text-xs">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-card/80 border border-border/50 text-foreground font-bold shadow-sm backdrop-blur-md">
                <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-bold">
                  {formatNumber(course?.stats?.enrollments ?? 0)}{" "}
                  {t("stats.students")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-card/80 border border-border/50 text-foreground font-bold shadow-sm backdrop-blur-md">
                <BarChart3
                  className="h-4 w-4 text-brand-accent"
                  aria-hidden="true"
                />
                <span>{t(`levels.${course?.level}`)}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-card/80 border border-border/50 text-foreground font-bold shadow-sm backdrop-blur-md">
                <Calendar
                  className="h-4 w-4 text-brand-cyan"
                  aria-hidden="true"
                />
                <time dateTime={course?.createdAt}>
                  {formatRelativeTime(course?.createdAt, locale)}
                </time>
              </div>
            </div>

            {course?.imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl mb-8 border border-border/50 shadow-2xl dark:shadow-xl shadow-primary/10">
                <Image
                  src={course?.imageUrl}
                  alt={course?.title}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  itemProp="image"
                />
              </div>
            )}

            <div className="mb-10 flex justify-end">
              <CourseActionButtons course={course} slug={slug} />
            </div>

            <section
              aria-labelledby="about-course-title"
              className="mb-10 p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm"
            >
              <h2
                id="about-course-title"
                className="text-2xl font-black text-foreground mb-4 flex items-center gap-3"
              >
                <span className="h-8 w-1.5 rounded-full bg-linear-to-b from-primary to-brand-accent shadow-sm" />
                {t("aboutCourse")}
              </h2>

              <p
                className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium whitespace-pre-line"
                itemProp="description"
              >
                {course?.description}
              </p>
            </section>

            <div className="mb-10">
              <CourseFeatures />
            </div>

            {course?.teacher && (
              <div className="mb-10">
                <CourseTeacherCard teacher={course.teacher} />
              </div>
            )}

            <div className="mb-8">
              <CourseCommentsSection courseSlug={slug} courseId={course?.id} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <CoursePriceCard
              course={course}
              slug={slug}
              isLoadingCourse={isLoading || isFetching}
            />
          </aside>
        </div>
      </div>
      <meta itemProp="url" content={`/courses/${course?.slug}`} />
    </div>
  );
}
