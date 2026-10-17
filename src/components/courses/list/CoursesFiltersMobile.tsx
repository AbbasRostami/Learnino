"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { CoursesFilters, getCourseActiveFiltersCount } from "./CoursesFilters";

interface CoursesFiltersMobileProps {
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

export function CoursesFiltersMobile(props: CoursesFiltersMobileProps) {
  const t = useTranslations("course");

  const activeFiltersCount = getCourseActiveFiltersCount({
    categories: props.categories,
    level: props.level,
    minPrice: props.minPrice,
    maxPrice: props.maxPrice,
  });

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="w-full h-11 gap-2 rounded-2xl relative border-border/60 bg-card/60 backdrop-blur-sm lg:hidden"
            aria-label={t("openFilters")}
          >
            <Filter className="h-4 w-4" />
            <span>{t("filters")}</span>
            {activeFiltersCount > 0 && (
              <Badge
                variant="default"
                className="h-5 min-w-5 px-1.5 rounded-full absolute -top-1 -inset-e-1 text-xs bg-primary text-primary-foreground"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        }
      />
      <SheetContent
        showCloseButton
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-4">
          <SheetDescription className="sr-only">
            {t("filterCategories")}
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 pt-0">
          <CoursesFilters compact {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
