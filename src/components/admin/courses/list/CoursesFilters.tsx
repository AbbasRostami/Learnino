"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared";
import { useTranslations } from "next-intl";

interface CoursesFiltersProps {
  search: string;
  level: string;
  published: string;
  sortBy: string;
  order: string;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPublishedChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onResetFilters: () => void;
}

export function CoursesFilters({
  search,
  level,
  published,
  sortBy,
  order,
  onSearchChange,
  onLevelChange,
  onPublishedChange,
  onSortByChange,
  onOrderChange,
  onResetFilters,
}: CoursesFiltersProps) {
  const t = useTranslations("admin.courses.filters");
  const tLevels = useTranslations("admin.courses.levels");
  const tFilters = useTranslations("admin.filters");

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(level) ||
    Boolean(published) ||
    sortBy !== "createdAt" ||
    order !== "desc";

  const filters: FilterSelectConfig[] = [
    {
      id: "level",
      value: level,
      placeholder: t("allLevels"),
      onChange: onLevelChange,
      options: [
        { value: "all", label: t("allLevels") },
        { value: "BEGINNER", label: tLevels("BEGINNER") },
        { value: "INTERMEDIATE", label: tLevels("INTERMEDIATE") },
        { value: "ADVANCED", label: tLevels("ADVANCED") },
      ],
    },
    {
      id: "published",
      value: published,
      placeholder: t("allPublish"),
      onChange: onPublishedChange,
      options: [
        { value: "all", label: t("allPublish") },
        { value: "true", label: t("publishedOnly") },
        { value: "false", label: t("draftOnly") },
      ],
    },
    {
      id: "sortBy",
      value: sortBy || "createdAt",
      onChange: onSortByChange,
      allValue: "createdAt",
      options: [
        { value: "createdAt", label: t("sortCreatedAt") },
        { value: "price", label: t("sortPrice") },
        { value: "titleFa", label: t("sortTitle") },
      ],
    },
    {
      id: "order",
      value: order || "desc",
      onChange: onOrderChange,
      allValue: "desc",
      options: [
        { value: "desc", label: tFilters("sortNewest") },
        { value: "asc", label: tFilters("sortOldest") },
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
