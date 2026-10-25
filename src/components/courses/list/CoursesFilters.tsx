"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCategories } from "@/services";
import {
  BarChart3,
  DollarSign,
  Filter,
  Layers,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

const LEVELS = [
  { value: "BEGINNER", labelKey: "BEGINNER" as const },
  { value: "INTERMEDIATE", labelKey: "INTERMEDIATE" as const },
  { value: "ADVANCED", labelKey: "ADVANCED" as const },
];

export interface FilterValues {
  categories: string[];
  level: string;
  minPrice: number | null;
  maxPrice: number | null;
}

export function getCourseActiveFiltersCount(filters: FilterValues): number {
  return (
    filters.categories.length +
    (filters.level ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0)
  );
}

interface CoursesFiltersProps {
  compact?: boolean;
  categories: string[];
  level: string;
  minPrice: number | null;
  maxPrice: number | null;
  onCategoriesChange: (value: string[] | null) => void;
  onLevelChange: (value: string | null) => void;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
  onResetFilters: () => void;
}

export function CoursesFilters({
  compact = false,
  categories: selectedCategories,
  level,
  minPrice,
  maxPrice,
  onCategoriesChange,
  onLevelChange,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters,
}: CoursesFiltersProps) {
  const t = useTranslations("course");
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();
  const categoriesList = categoriesData?.data?.categories ?? [];

  const activeFiltersCount = getCourseActiveFiltersCount({
    categories: selectedCategories,
    level,
    minPrice,
    maxPrice,
  });

  const toggleCategory = (slug: string) => {
    const updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];
    onCategoriesChange(updated.length ? updated : null);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-3xl border border-border/50 bg-card shadow-xs",
        compact ? "p-4" : "p-6",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-black text-foreground">
              {t("filters")}
            </h3>
            {activeFiltersCount > 0 && (
              <p className="text-xs text-primary font-bold mt-0.5">
                {t("activeFilters", { count: activeFiltersCount })}
              </p>
            )}
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-8 gap-1 text-xs text-muted-foreground hover:text-destructive cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t("clearFilters")}</span>
          </Button>
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Layers
            className="h-3.5 w-3.5 text-brand-accent"
            aria-hidden="true"
          />
          <Label className="text-xs font-bold text-foreground">
            {t("filterCategories")}
          </Label>
        </div>
        <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border">
          {isCategoriesLoading
            ? [65, 45, 75, 50, 85]?.map((width, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 h-9.5 rounded-xl border border-transparent bg-muted/30"
                >
                  <Skeleton
                    className="h-3.5 rounded-md bg-primary/15 dark:bg-primary/20"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))
            : categoriesList?.map((cat) => {
                const isActive = selectedCategories.includes(cat?.slug);
                return (
                  <Button
                    variant="outline"
                    key={cat?.id}
                    type="button"
                    onClick={() => toggleCategory(cat?.slug)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 h-9.5 rounded-xl text-xs font-semibold text-start transition-all cursor-pointer",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-foreground/80 hover:bg-muted border border-transparent",
                    )}
                    aria-pressed={isActive}
                  >
                    <span className="truncate">{cat?.name}</span>
                    {isActive && (
                      <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                );
              })}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <BarChart3
            className="h-3.5 w-3.5 text-brand-cyan"
            aria-hidden="true"
          />
          <Label className="text-xs font-bold text-foreground">
            {t("filterLevel")}
          </Label>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            type="button"
            onClick={() => onLevelChange(null)}
            className={cn(
              "px-2 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
              !level
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted text-foreground/80 hover:text-foreground hover:bg-muted/80",
            )}
          >
            {t("allLevels")}
          </Button>
          {LEVELS.map((lvl) => (
            <Button
              key={lvl.value}
              type="button"
              onClick={() =>
                onLevelChange(level === lvl.value ? null : lvl.value)
              }
              className={cn(
                "px-2 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                level === lvl.value
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-foreground/80 hover:text-foreground hover:bg-muted/80",
              )}
            >
              {t(`levels.${lvl.labelKey}`)}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <DollarSign
            className="h-3.5 w-3.5 text-emerald-500"
            aria-hidden="true"
          />
          <Label className="text-xs font-bold text-foreground">
            {t("filterPrice")}
          </Label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="minPrice" className="text-xs text-muted-foreground">
              {t("priceMin")}
            </Label>
            <Input
              id="minPrice"
              type="number"
              inputMode="numeric"
              value={minPrice ?? ""}
              onChange={(e) =>
                onMinPriceChange(e.target.value ? Number(e.target.value) : null)
              }
              placeholder="0"
              className="h-9 text-xs rounded-xl"
              min={0}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">
              {t("priceMax")}
            </Label>
            <Input
              id="maxPrice"
              type="number"
              inputMode="numeric"
              value={maxPrice ?? ""}
              onChange={(e) =>
                onMaxPriceChange(e.target.value ? Number(e.target.value) : null)
              }
              placeholder="∞"
              className="h-9 text-xs rounded-xl"
              min={0}
            />
          </div>
        </div>

        <div className="flex gap-1.5">
          <Button
            type="button"
            onClick={() => {
              onMinPriceChange(null);
              onMaxPriceChange(0);
            }}
            className={cn(
              "flex-1 px-2 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 border",
              maxPrice === 0 && minPrice === null
                ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-muted text-foreground/80 hover:bg-muted/80 border-transparent",
            )}
          >
            <Sparkles className="h-3 w-3" />
            <span>{t("onlyFree")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
