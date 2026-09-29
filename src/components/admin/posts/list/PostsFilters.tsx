"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface PostsFiltersProps {
  search: string;
  published: string;
  sortBy: string;
  order: string;
  onSearchChange: (value: string) => void;
  onPublishedChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onResetFilters: () => void;
}

export function PostsFilters({
  search,
  published,
  sortBy,
  order,
  onSearchChange,
  onPublishedChange,
  onSortByChange,
  onOrderChange,
  onResetFilters,
}: PostsFiltersProps) {
  const t = useTranslations("admin.posts.filters");
  const tFilters = useTranslations("admin.filters");

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(published) ||
    sortBy !== "createdAt" ||
    order !== "desc";

  const filters: FilterSelectConfig[] = [
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