"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, SortDesc, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface CoursesToolbarProps {
  resultsCount: number;
  searchValue: string;
  sortBy: string;
  order: string;
  onSearchChange: (value: string) => void; 
  onSortChange: (sortBy: string, order: string) => void;
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
  searchValue,
  sortBy,
  order,
  onSearchChange,
  onSortChange,
  mobileFiltersSlot,
}: CoursesToolbarProps) {
  const t = useTranslations("course");

  const currentSortValue = `${sortBy}-${order}`;

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrder] = value.split("-");
    onSortChange(newSortBy, newOrder);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 w-full xl:max-w-none">
            <Search
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none right-3.5 ltr:left-3.5 ltr:right-auto"
              aria-hidden="true"
            />
            <Input
              type="text"
              inputMode="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-10 rounded-2xl pr-9 ltr:pl-9 ltr:pr-9 text-xs shadow-xs border-border/60 focus-visible:ring-primary/20 bg-card/60 [&::-webkit-search-cancel-button]:hidden"
              aria-label={t("searchPlaceholder")}
            />
            {searchValue && (
              <Button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute top-1/2 -translate-y-1/2 left-2.5 ltr:right-2.5 ltr:left-auto text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-md hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {mobileFiltersSlot && (
            <div className="lg:hidden shrink-0">{mobileFiltersSlot}</div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between xl:justify-end gap-3 shrink-0 border-t xl:border-t-0 border-border/30 pt-3 xl:pt-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground shrink-0 me-1">
              <SortDesc className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("filterSort")}:</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {SORT_OPTIONS?.map((option) => {
                const isActive = currentSortValue === option?.value;
                return (
                  <Button
                    key={option?.value}
                    type="button"
                    onClick={() => handleSortChange(option?.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-card/70 text-muted-foreground hover:bg-muted hover:text-foreground border-border/50",
                    )}
                  >
                    {t(option?.labelKey)}
                  </Button>
                );
              })}
            </div>
          </div>

          {resultsCount > 0 && (
            <div className="flex items-center shrink-0">
              <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
                {t("resultsCount", { count: resultsCount })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
