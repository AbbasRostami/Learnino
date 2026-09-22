"use client";

import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Loader2,
  MessageCircle,
  PlayCircle,
  Trash2,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface FavoriteCourseCardProps {
  courseData: any;
  onRemove: () => void;
  isRemoving: boolean;
  index: number;
}

export function FavoriteCourseCard({
  courseData,
  onRemove,
  isRemoving,
  index,
}: FavoriteCourseCardProps) {
  const t = useTranslations("course");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const style = courseData?.category
    ? getCategoryStyle(courseData?.category.slug)
    : null;
  const isFree = courseData?.price === 0;

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs hover:shadow-xl hover:border-primary/30 transition-all"
    >
      <Link
        href={`/courses/${courseData?.slug}`}
        className="relative aspect-16/10 w-full overflow-hidden bg-muted"
      >
        {courseData?.imageUrl ? (
          <Image
            src={courseData?.imageUrl}
            alt={courseData?.title}
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
          <PlayCircle className="h-10 w-10 text-white shadow-xl" />
        </div>

        <span className="absolute top-3 inset-e-3 flex items-center rounded-full bg-background/90 backdrop-blur-md px-2 py-1 text-[9px] font-bold shadow-sm">
          {t(`levels.${courseData?.level}`)}
        </span>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        disabled={isRemoving}
        className="absolute top-3 inset-s-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/90 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 disabled:opacity-50 z-20 cursor-pointer"
      >
        {isRemoving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>

      <div className="flex flex-1 flex-col p-4 gap-3">
        <div className="flex items-center justify-between">
          {courseData?.category && style && (
            <Link
              href={`/courses?categories=${courseData?.category.slug}`}
              className={cn(
                "px-2 py-0.5 rounded-md text-[10px] font-bold hover:opacity-80 transition-opacity",
                style.badgeColor,
              )}
            >
              {courseData?.category.name}
            </Link>
          )}
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {courseData?.stats?.enrollments ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {courseData?.stats?.comments ?? 0}
            </span>
          </div>
        </div>

        <h3 className="text-sm font-black text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-10">
          <Link href={`/courses/${courseData?.slug}`}>{courseData?.title}</Link>
        </h3>

        <div className="mt-auto pt-3 border-t border-dashed border-border/60 flex items-center justify-between">
          <span className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
            <Link href={`/courses/${courseData?.slug}`}>مشاهده جزئیات ←</Link>
          </span>

          <div className="text-end font-black" dir="ltr">
            {isFree ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                {t("free")}
              </span>
            ) : (
              <div>
                <span className="text-sm text-foreground">
                  {new Intl.NumberFormat(
                    locale === "fa" ? "fa-IR" : "en-US",
                  ).format(courseData?.price)}
                </span>
                <span className="text-[9px] text-muted-foreground ms-1">
                  {tCart("currency")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
