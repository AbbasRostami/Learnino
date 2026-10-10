"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCategories } from "@/services";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";

interface BlogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BlogFilters({ searchTerm, onSearchChange }: BlogFiltersProps) {
  const t = useTranslations("blog");

  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault(""),
  );

  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault("createdAt"),
  );

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data?.categories ?? [];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative w-full max-w-sm">
        <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
        <Input
          type="text"
          inputMode="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="h-11 rounded-2xl pr-10 ltr:pl-10 ltr:pr-3 shadow-xs border-border/60 focus-visible:ring-primary/20 bg-card/60 backdrop-blur-sm [&::-webkit-search-cancel-button]:hidden"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 -translate-y-1/2 left-2.5 ltr:right-2.5 ltr:left-auto text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap",
            !category
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card border-border/60 text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          {t("allCategories")}
        </button>

        {categories?.map((cat) => (
          <button
            key={cat?.id}
            type="button"
            onClick={() =>
              setCategory(category === cat?.slug ? null : cat?.slug)
            }
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap",
              category === cat?.slug
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card border-border/60 text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {cat?.name}
          </button>
        ))}

        <div className="hidden sm:block h-6 w-px bg-border mx-1" />

        <button
          type="button"
          onClick={() =>
            setSortBy(sortBy === "createdAt" ? "title" : "createdAt")
          }
          className="px-4 py-2 rounded-full text-xs font-bold border border-border/60 bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer whitespace-nowrap"
        >
          {sortBy === "createdAt" ? t("sortNewest") : t("sortTitle")}
        </button>
      </div>
    </div>
  );
}
