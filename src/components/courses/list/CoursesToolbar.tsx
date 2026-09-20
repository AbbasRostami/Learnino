"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortDesc, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

interface CoursesToolbarProps {
  resultsCount: number;
  mobileFiltersSlot?: React.ReactNode;
}

const SORT_OPTIONS = [
  { value: "createdAt-desc", labelKey: "sortNewest" },
  { value: "createdAt-asc", labelKey: "sortOldest" },
  { value: "price-asc", labelKey: "sortPriceAsc" },
  { value: "price-desc", labelKey: "sortPriceDesc" },
  { value: "titleFa-asc", labelKey: "sortTitle" },
] as const;

export function CoursesToolbar({
  resultsCount,
  mobileFiltersSlot,
}: CoursesToolbarProps) {
  const t = useTranslations("course");

  const [state, setState] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      sortBy: parseAsString.withDefault("createdAt"),
      order: parseAsString.withDefault("desc"),
    },
    { shallow: true, throttleMs: 300 },
  );

  const sortValue = `${state.sortBy}-${state.order}`;

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === sortValue);

  const handleSortChange = (value: string | null) => {
    if (!value) return;
    const [sortBy, order] = value.split("-");
    setState({ sortBy, order });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={state.search}
            onChange={(e) => setState({ search: e.target.value || null })}
            placeholder={t("searchPlaceholder")}
            className="h-11 rounded-2xl pr-10 ltr:pl-10 ltr:pr-3 shadow-xs border-border/60 focus-visible:ring-primary/20 bg-card/60 backdrop-blur-sm"
            aria-label={t("searchPlaceholder")}
          />
          {state.search && (
            <button
              type="button"
              onClick={() => setState({ search: null })}
              className="absolute top-1/2 -translate-y-1/2 left-3 ltr:right-3 ltr:left-auto text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {mobileFiltersSlot}

        <Select value={sortValue} onValueChange={handleSortChange}>
          <SelectTrigger
            className="h-11 w-auto min-w-37.5 sm:min-w-45 rounded-2xl shadow-xs gap-2 border-border/60 bg-card/60 backdrop-blur-sm"
            aria-label={t("filterSort")}
          >
            <SortDesc
              className="h-4 w-4 text-muted-foreground shrink-0"
              aria-hidden="true"
            />
            <SelectValue>
              {currentOption ? t(currentOption.labelKey) : t("filterSort")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end" className="rounded-2xl">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {resultsCount > 0 && (
        <p className="text-xs text-muted-foreground font-semibold shrink-0">
          {t("resultsCount", { count: resultsCount })}
        </p>
      )}
    </div>
  );
}
