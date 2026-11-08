"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared";
import { useTranslations } from "next-intl";

interface CommentsFiltersProps {
  search: string;
  status: string;
  sortBy?: string;
  order?: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

export function CommentsFilters({
  search,
  status,
  sortBy,
  order,
  onSearchChange,
  onStatusChange,
  onResetFilters,
}: CommentsFiltersProps) {
  const t = useTranslations("admin.comments.filters");

  const hasActiveFilters =
    Boolean(search) || Boolean(status) || Boolean(sortBy) || Boolean(order);

  const filters: FilterSelectConfig[] = [
    {
      id: "status",
      value: status,
      placeholder: t("allStatuses"),
      onChange: onStatusChange,
      options: [
        { value: "all", label: t("allStatuses") },
        { value: "PENDING", label: t("pendingOnly") },
        { value: "APPROVED", label: t("approvedOnly") },
        { value: "REJECTED", label: t("rejectedOnly") },
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
