"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { CoursesFilters } from "./CoursesFilters";

export function CoursesFiltersMobile() {
  const t = useTranslations("course");

  const [filters] = useQueryStates({
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    level: parseAsString.withDefault(""),
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  const activeFiltersCount =
    filters.categories.length +
    (filters.level ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden gap-2 rounded-xl relative"
          aria-label={t("openFilters")}
        >
          <Filter className="h-4 w-4" />
          <span>{t("filters")}</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="default"
              className="h-5 min-w-5 px-1.5 rounded-full absolute -top-1 -right-1 text-[10px]"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>{t("filters")}</SheetTitle>
          <SheetDescription className="sr-only">
            {t("filterCategories")}
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 pt-0">
          <CoursesFilters compact />
        </div>
      </SheetContent>
    </Sheet>
  );
}
