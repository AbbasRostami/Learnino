"use client";

import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:transform-none"
      itemScope
      itemType="https://schema.org/Course"
    >
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
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            itemProp="image"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}

        <div className="absolute top-3 inset-e-3 flex items-center rounded-full bg-background/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold shadow-sm">
          {t(`levels.${course?.level}`)}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold">
          <span className={cn("px-2 py-1 rounded-md", style.badgeColor)}>
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

        <div className="mt-auto pt-4 flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border/50 bg-muted">
            {course?.teacher?.avatar ? (
              <Image
                src={course?.teacher?.avatar}
                alt={course?.teacher?.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/10 text-primary text-xs font-bold">
                {course?.teacher?.name?.charAt(0)}
              </div>
            )}
          </div>
          <span
            className="text-xs font-medium text-muted-foreground"
            itemProp="provider"
          >
            {course?.teacher?.name}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border/60 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{course?.reactions?.likes?.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{course?.stats?.comments?.toLocaleString()}</span>
            </div>
          </div>

          <div className="font-black text-foreground text-end">
            {isFree ? (
              <span className="text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md text-sm">
                {t("free")}
              </span>
            ) : (
              <div className="flex flex-col">
                <span className="text-lg font-black leading-tight" dir="ltr">
                  {new Intl.NumberFormat(
                    locale === "fa" ? "fa-IR" : "en-US",
                  ).format(course?.price)}
                </span>
                <span className="text-[10px] text-muted-foreground">
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
