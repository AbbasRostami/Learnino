"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface TeachersFiltersProps {
  search: string;
  show: string;
  onSearchChange: (value: string) => void;
  onShowChange: (value: string) => void;
  onResetFilters: () => void;
}

export function TeachersFilters({
  search,
  show,
  onSearchChange,
  onShowChange,
  onResetFilters,
}: TeachersFiltersProps) {
  const t = useTranslations("admin.teachers.filters");
  const hasActiveFilters = Boolean(search) || Boolean(show);

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