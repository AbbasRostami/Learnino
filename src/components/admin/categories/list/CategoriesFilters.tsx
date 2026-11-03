"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface CategoriesFiltersProps {
  search: string;
  show: string;
  sortBy: string | null;
  order: string | null;
  onSearchChange: (value: string) => void;
  onShowChange: (value: string) => void;
  onResetFilters: () => void;
}

export function CategoriesFilters({
  search,
  show,
  sortBy,
  order,
  onSearchChange,
  onShowChange,
  onResetFilters,
}: CategoriesFiltersProps) {
  const t = useTranslations("admin.categories.filters");

  const hasActiveFilters =
    Boolean(search) || Boolean(show) || Boolean(sortBy) || Boolean(order);

  const filters: FilterSelectConfig[] = [
    {
      id: "show",
      value: show,
      placeholder: t("allVisibility"),
      onChange: onShowChange,
      options: [
        { value: "all", label: t("allVisibility") },
        { value: "true", label: t("showOnly") },
        { value: "false", label: t("hiddenOnly") },
      ],
    },
  ];

  return (
    <AdminFilters
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder={t("searchPlaceholder")}
      filters={filters}
      hasActiveFilters={hasActiveFilters}
      onReset={onResetFilters}
    />
  );
}
