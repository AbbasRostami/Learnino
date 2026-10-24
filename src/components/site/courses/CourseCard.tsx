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

interface CourseCardProps {
  course: Course;
  priority?: boolean;
}

export function CourseCard({ course, priority = false }: CourseCardProps) {
  const t = useTranslations("course");
  const style = getCategoryStyle(course?.category?.slug);

  const isFree = course?.price === 0;
  const locale = useLocale();
  const teacherSlug = course?.teacher?.slug;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 motion-reduce:transition-none motion-reduce:hover:transform-none"
      itemScope
      itemType="https://schema.org/Course"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <Link
        href={`/courses/${course?.slug}`}
        className="relative aspect-16/10 w-full overflow-hidden bg-muted shrink-0"
        aria-label={course?.title}
      >
        {course?.imageUrl ? (
          <Image
            src={course?.imageUrl}
            alt={course?.title}
            fill
            priority={priority}
            quality={75}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
            itemProp="image"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}

        <div
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span
          className={cn(
            "absolute top-3 inset-e-3 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-black shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 border shrink-0",
            course?.level === "BEGINNER" &&
              "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/20 shadow-emerald-500/10",
            course?.level === "INTERMEDIATE" &&
              "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400 dark:bg-amber-500/20 shadow-amber-500/10",
            course?.level === "ADVANCED" &&
              "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400 dark:bg-rose-500/20 shadow-rose-500/10",
            !["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(
              course?.level || "",
            ) && "bg-background/90 text-foreground border-border/60",
          )}
        >
          <span
            className={cn(
              "relative flex h-2 w-2 rounded-full shrink-0",
              course?.level === "BEGINNER" && "bg-emerald-500",
              course?.level === "INTERMEDIATE" && "bg-amber-500",
              course?.level === "ADVANCED" && "bg-rose-500",
              !["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(
                course?.level || "",
              ) && "bg-primary",
            )}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 bg-inherit" />
          </span>

          {t(`levels.${course?.level}`)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-3 text-xs font-semibold h-6 shrink-0">
          <span
            className={cn(
              "px-2.5 py-1 rounded-md border border-border/40 truncate max-w-[65%]",
              style.badgeColor,
            )}
          >
            {course?.category?.name}
          </span>
          <div
            className="flex items-center gap-1 text-muted-foreground shrink-0"
            title={t("studentsCount", { count: course?.stats?.enrollments })}
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{course?.stats?.enrollments}</span>
          </div>
        </div>

        <div className="h-11 md:h-13 mb-2 flex items-start overflow-hidden">
          <h3
            className="line-clamp-2 text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
            itemProp="name"
          >
            <Link href={`/courses/${course?.slug}`}>{course?.title}</Link>
          </h3>
        </div>

        <div className="mt-2 flex items-center gap-2 h-8 shrink-0">
          {teacherSlug ? (
            <Link
              href={`/teachers/${teacherSlug}`}
              className="flex items-center gap-2 group/teacher transition-opacity hover:opacity-80 min-w-0"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border-2 border-background bg-muted shadow-xs ring-1 ring-border/40">
                {course?.teacher?.avatar ? (
                  <Image
                    src={course?.teacher?.avatar}
                    alt={course?.teacher?.name}
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
            <div className="flex items-center gap-2 min-w-0">
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

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-pink-500">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{course?.reactions?.likes}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{course?.stats?.comments}</span>
            </div>
          </div>

          <div className="flex h-10 items-center justify-end font-black text-foreground text-end">
            {isFree ? (
              <span className="text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-md text-sm font-extrabold shadow-sm">
                {t("free")}
              </span>
            ) : (
              <div className="flex flex-col items-end justify-center">
                <span className="text-base md:text-lg font-black leading-tight bg-linear-to-l from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatNumber(course?.price, locale)}
                </span>
                <span className="text-xs font-medium text-muted-foreground leading-tight">
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
