"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared";
import { useTranslations } from "next-intl";

interface UsersFiltersProps {
  search: string;
  role: string;
  isVerified: string;
  sortBy: string;
  order: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onVerifiedChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onResetFilters: () => void;
}

export function UsersFilters({
  search,
  role,
  isVerified,
  sortBy,
  order,
  onSearchChange,
  onRoleChange,
  onVerifiedChange,
  onSortByChange,
  onOrderChange,
  onResetFilters,
}: UsersFiltersProps) {
  const t = useTranslations("admin.users.filters");
  const tFilters = useTranslations("admin.filters");

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(role) ||
    Boolean(isVerified) ||
    sortBy !== "createdAt" ||
    order !== "desc";

  const filters: FilterSelectConfig[] = [
    {
      id: "role",
      value: role,
      placeholder: t("allRoles"),
      onChange: onRoleChange,
      options: [
        { value: "all", label: t("allRoles") },
        { value: "USER", label: t("roleUser") },
        { value: "ADMIN", label: t("roleAdmin") },
      ],
    },
    {
      id: "isVerified",
      value: isVerified,
      placeholder: t("allVerification"),
      onChange: onVerifiedChange,
      options: [
        { value: "all", label: t("allVerification") },
        { value: "true", label: t("verifiedOnly") },
        { value: "false", label: t("unverifiedOnly") },
      ],
    },
    {
      id: "sortBy",
      value: sortBy || "createdAt",
      onChange: onSortByChange,
      allValue: "createdAt",
      options: [
        { value: "createdAt", label: t("sortDate") },
        { value: "name", label: t("sortName") },
        { value: "email", label: t("sortEmail") },
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
