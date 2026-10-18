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
        className="relative aspect-16/10 w-full overflow-hidden bg-muted"
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

        <div className="absolute top-3 inset-e-3 flex items-center rounded-full border border-white/20 bg-background/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold shadow-md">
          {t(`levels.${course?.level}`)}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold">
          <span
            className={cn(
              "px-2.5 py-1 rounded-md border border-border/40",
              style.badgeColor,
            )}
          >
            {course?.category?.name}
          </span>
          <div
            className="flex items-center gap-1 text-muted-foreground"
            title={t("studentsCount", { count: course?.stats?.enrollments })}
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{course?.stats?.enrollments}</span>
          </div>
        </div>

        <h3
          className="mb-2 line-clamp-2 text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
          itemProp="name"
        >
          <Link href={`/courses/${course?.slug}`}>{course?.title}</Link>
        </h3>

        <div className="mt-auto pt-4 flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-border/60 bg-muted">
            {course?.teacher?.avatar ? (
              <Image
                src={course?.teacher?.avatar}
                alt={course?.teacher?.name}
                fill
                sizes="36px"
                quality={75}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/10 text-primary text-xs font-bold">
                {course?.teacher?.name?.charAt(0)}
              </div>
            )}
          </div>
          <span
            className="text-xs font-semibold text-foreground/80"
            itemProp="provider"
          >
            {course?.teacher?.name}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border/60 pt-4">
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
                <span
                  className="text-base md:text-lg font-black leading-tight bg-linear-to-l from-primary to-primary/70 bg-clip-text text-transparent"
                  dir="ltr"
                >
                  {formatNumber(course?.price, locale)}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground leading-tight">
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
