"use client";

import { Button } from "@/components/ui/button";
import { BookOpenText, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

interface EmptyCoursesStateProps {
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
}

export function EmptyCoursesState({
  hasActiveFilters = false,
  onResetFilters,
}: EmptyCoursesStateProps) {
  const t = useTranslations("course");

  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground shadow-xs">
        <BookOpenText className="h-8 w-8" aria-hidden="true" />
      </div>

      <h3 className="text-base font-black text-foreground sm:text-lg">
        {hasActiveFilters ? t("emptyFilteredTitle") : t("emptyTitle")}
      </h3>

      <p className="mt-2 max-w-sm text-xs font-semibold leading-relaxed text-muted-foreground">
        {hasActiveFilters
          ? t("emptyFilteredDescription")
          : t("emptyDescription")}
      </p>

      {hasActiveFilters && onResetFilters && (
        <Button
          type="button"
          variant="outline"
          onClick={onResetFilters}
          className="mt-5 h-10 gap-2 rounded-xl text-xs font-bold cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("clearFilters")}</span>
        </Button>
      )}
    </div>
  );
}
