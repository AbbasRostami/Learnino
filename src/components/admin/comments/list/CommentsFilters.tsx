"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared";
import { useTranslations } from "next-intl";

interface CommentsFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

export function CommentsFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onResetFilters,
}: CommentsFiltersProps) {
  const t = useTranslations("admin.comments.filters");
  const hasActiveFilters = Boolean(search) || Boolean(status);

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
