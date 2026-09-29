"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface OrdersFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

export function OrdersFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onResetFilters,
}: OrdersFiltersProps) {
  const t = useTranslations("admin.orders.filters");
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
        { value: "PAID", label: t("paidOnly") },
        { value: "CANCELLED", label: t("cancelledOnly") },
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