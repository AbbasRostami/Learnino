"use client";

import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { CategoryWithCount } from "@/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface CategoryCardProps {
  category: CategoryWithCount;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations("category");
  const style = getCategoryStyle(category?.slug);
  const Icon = style?.icon;

  return (
    <Link
      href={`/courses?categories=${category?.slug}`}
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-2xl h-full",
        "border border-border/60 bg-card/60 backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-primary/40",
        "overflow-hidden motion-reduce:transition-none motion-reduce:hover:transform-none",
      )}
      aria-label={`${category?.name} - ${t("coursesCount", { count: category?._count?.courses })}`}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-12 -inset-s-12 h-28 w-28 rounded-full bg-linear-to-br blur-2xl transition-opacity group-hover:opacity-100 opacity-60",
          style.gradient,
        )}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl border border-border/40 shadow-xs transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100",
              style.badgeColor,
            )}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          <span
            className={cn(
              "text-xs font-bold px-3 py-1 rounded-full border border-border/30",
              style.badgeColor,
            )}
          >
            {t("coursesCount", { count: category?._count?.courses })}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {category?.name}
        </h3>

        {category?.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {category?.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors relative">
        <span>{t("viewCourses")}</span>
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
