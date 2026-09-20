"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

const LEVELS = [
  { value: "BEGINNER", labelKey: "BEGINNER" as const },
  { value: "INTERMEDIATE", labelKey: "INTERMEDIATE" as const },
  { value: "ADVANCED", labelKey: "ADVANCED" as const },
];

interface CoursesFiltersProps {
  compact?: boolean;
}

export function CoursesFilters({ compact = false }: CoursesFiltersProps) {
  const t = useTranslations("course");
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data?.categories ?? [];

  const [filters, setFilters] = useQueryStates({
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    level: parseAsString.withDefault(""),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  const clearAll = () => {
    setFilters({
      categories: null,
      level: null,
      minPrice: null,
      maxPrice: null,
    });
  };

  const toggleCategory = (slug: string) => {
    const current = filters.categories;
    const updated = current.includes(slug)
      ? current.filter((c) => c !== slug)
      : [...current, slug];
    setFilters({ categories: updated.length ? updated : null });
  };

  const activeFiltersCount =
    filters.categories.length +
    (filters.level ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-3xl border border-border/50 bg-card shadow-sm",
        compact ? "p-4" : "p-6",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-black text-foreground">
              {t("filters")}
            </h2>
            {activeFiltersCount > 0 && (
              <p className="text-[10px] text-primary font-bold mt-0.5">
                {t("activeFilters", { count: activeFiltersCount })}
              </p>
            )}
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-8 gap-1 text-xs text-muted-foreground hover:text-destructive"
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
          {categories.map((cat) => {
            const isActive = filters.categories.includes(cat.slug);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.slug)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-start transition-all cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:bg-muted border border-transparent",
                )}
                aria-pressed={isActive}
              >
                <span className="truncate">{cat.name}</span>
                {isActive && (
                  <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
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
          <button
            type="button"
            onClick={() => setFilters({ level: null })}
            className={cn(
              "px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer",
              !filters.level
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {t("allLevels")}
          </button>
          {LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              type="button"
              onClick={() =>
                setFilters({
                  level: filters.level === lvl.value ? null : lvl.value,
                })
              }
              className={cn(
                "px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer",
                filters.level === lvl.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              {t(`levels.${lvl.labelKey}`)}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
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
            <Label
              htmlFor="minPrice"
              className="text-[10px] text-muted-foreground"
            >
              {t("priceMin")}
            </Label>
            <Input
              id="minPrice"
              type="number"
              inputMode="numeric"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  minPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              placeholder="0"
              className="h-9 text-xs rounded-xl"
              min={0}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="maxPrice"
              className="text-[10px] text-muted-foreground"
            >
              {t("priceMax")}
            </Label>
            <Input
              id="maxPrice"
              type="number"
              inputMode="numeric"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                })
              }
              placeholder="∞"
              className="h-9 text-xs rounded-xl"
              min={0}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setFilters({ minPrice: null, maxPrice: 0 })}
            className={cn(
              "flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1",
              filters.maxPrice === 0 && filters.minPrice === null
                ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                : "bg-muted text-muted-foreground hover:bg-muted/70 border border-transparent",
            )}
          >
            <Sparkles className="h-3 w-3" />
            <span>{t("onlyFree")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
