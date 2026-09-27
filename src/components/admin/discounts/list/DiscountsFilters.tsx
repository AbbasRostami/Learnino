"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface DiscountsFiltersProps {
  search: string;
  active: string;
  onSearchChange: (value: string) => void;
  onActiveChange: (value: string) => void;
  onResetFilters: () => void;
}

export function DiscountsFilters({
  search,
  active,
  onSearchChange,
  onActiveChange,
  onResetFilters,
}: DiscountsFiltersProps) {
  const t = useTranslations("admin.discounts.filters");
  const hasActiveFilters = Boolean(search) || Boolean(active);

  const filters: FilterSelectConfig[] = [
    {
      id: "active",
      value: active,
      placeholder: t("allActive"),
      onChange: onActiveChange,
      options: [
        { value: "all", label: t("allActive") },
        { value: "true", label: t("activeOnly") },
        { value: "false", label: t("inactiveOnly") },
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