"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCategories } from "@/services";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";

export function BlogFilters() {
  const t = useTranslations("blog");

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 300 }),
  );

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
      <div className="relative max-w-md">
        <Search className="absolute top-3 h-4 w-4 text-muted-foreground pointer-events-none right-3 ltr:left-3 ltr:right-auto" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          placeholder={t("searchPlaceholder")}
          className="h-11 rounded-xl pr-10 ltr:pl-10 ltr:pr-3"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch(null)}
            className="absolute top-3 left-3 ltr:right-3 ltr:left-auto text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer",
            !category
              ? "bg-primary text-primary-foreground border-primary"
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
              "px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer",
              category === cat?.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border/60 text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {cat?.name}
          </button>
        ))}

        <div className="hidden sm:block h-6 w-px bg-border mx-2" />

        <button
          type="button"
          onClick={() =>
            setSortBy(sortBy === "createdAt" ? "title" : "createdAt")
          }
          className="px-4 py-2 rounded-full text-xs font-bold border border-border/60 bg-card text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer"
        >
          {sortBy === "createdAt" ? t("sortNewest") : t("sortTitle")}
        </button>
      </div>
    </div>
  );
}
