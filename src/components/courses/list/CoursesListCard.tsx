"use client";

import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";
import { formatNumber } from "@/utils/formatters";
import { BookOpen, Heart, MessageCircle, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CoursesListCardProps {
  course: Course;
  priority?: boolean;
  index?: number;
}

export function CoursesListCard({
  course,
  priority = false,
}: CoursesListCardProps) {
  const t = useTranslations("course");
  const style = getCategoryStyle(course?.category?.slug);
  const locale = useLocale();

  const isFree = course?.price === 0;
  const teacherSlug = course?.teacher?.slug;

  return (
    <article
      data-testid="course-card"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-backwards motion-reduce:animate-none motion-reduce:hover:transform-none"
      itemScope
      itemType="https://schema.org/Course"
    >
      <Link
        data-testid="course-title-link"
        href={`/courses/${course?.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-muted"
        aria-label={course?.title}
      >
        {course?.imageUrl ? (
          <Image
            src={course?.imageUrl}
            alt={course?.title}
            fill
            priority={priority}
            quality={70}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
            itemProp="image"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/5 to-brand-accent/5">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        <div
          className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        <span className="absolute top-3 inset-e-3 flex items-center rounded-full bg-background/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-foreground shadow-xs border border-border/60">
          {t(`levels.${course?.level}`)}
        </span>

        {isFree && (
          <span className="absolute top-3 inset-s-3 flex items-center gap-1 rounded-full bg-emerald-800 dark:bg-emerald-700 text-white px-2.5 py-1 text-xs font-black shadow-md">
            {t("free")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-bold",
              style.badgeColor,
            )}
          >
            {course?.category?.name}
          </span>
          <div
            className="flex items-center gap-1 text-foreground/80"
            title={t("studentsCount", { count: course?.stats?.enrollments })}
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-bold">{course?.stats?.enrollments}</span>
          </div>
        </div>

        <h2
          className="mb-2 line-clamp-2 text-base md:text-[17px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors min-h-12"
          itemProp="name"
        >
          <Link
            href={`/courses/${course?.slug}`}
            className="hover:underline underline-offset-2"
          >
            {course?.title}
          </Link>
        </h2>

        <div className="mt-2 flex items-center gap-2">
          {teacherSlug ? (
            <Link
              href={`/teachers/${teacherSlug}`}
              className="flex items-center gap-2 group/teacher transition-opacity hover:opacity-80"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border-2 border-background bg-muted shadow-xs ring-1 ring-border/40">
                {course?.teacher?.avatar ? (
                  <Image
                    src={course.teacher.avatar}
                    alt={course.teacher.name}
                    fill
                    quality={85}
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-primary/10 text-primary-700 dark:text-primary-300 text-xs font-bold">
                    {course?.teacher?.name?.charAt(0)}
                  </div>
                )}
              </div>
              <span
                className="text-xs font-bold text-foreground/80 group-hover/teacher:text-primary transition-colors truncate"
                itemProp="provider"
              >
                {course?.teacher?.name}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border-2 border-background bg-muted">
                <div className="flex h-full items-center justify-center bg-primary/10 text-primary-700 dark:text-primary-300 text-xs font-bold">
                  {course?.teacher?.name?.charAt(0)}
                </div>
              </div>
              <span className="text-xs font-bold text-foreground/80 truncate">
                {course?.teacher?.name}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-foreground/80">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-bold">{course?.reactions?.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-foreground/80">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-bold">{course?.stats?.comments}</span>
            </div>
          </div>

          <div className="text-end">
            {isFree ? (
              <span className="text-sm font-black text-emerald-800 dark:text-emerald-300">
                {t("free")}
              </span>
            ) : (
              <div className="flex flex-col items-end">
                <span
                  className="text-base font-black leading-tight text-foreground"
                  dir="ltr"
                >
                  {formatNumber(course?.price, locale)}
                </span>
                <span className="text-xs text-foreground/70 font-semibold -mt-0.5">
                  {t("currency")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <meta itemProp="url" content={`/courses/${course?.slug}`} />
      <meta itemProp="description" content={course?.description} />
    </article>
  );
}
