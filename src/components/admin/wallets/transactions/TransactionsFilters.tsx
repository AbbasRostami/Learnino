"use client";

import {
  AdminFilters,
  type FilterSelectConfig,
} from "@/components/admin/shared/AdminFilters";
import { useTranslations } from "next-intl";

interface TransactionsFiltersProps {
  status: string;
  type: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onResetFilters: () => void;
}

export function TransactionsFilters({
  status,
  type,
  onStatusChange,
  onTypeChange,
  onResetFilters,
}: TransactionsFiltersProps) {
  const t = useTranslations("admin.wallets.filters");

  const hasActiveFilters = Boolean(status) || Boolean(type);

  const filters: FilterSelectConfig[] = [
    {
      id: "status",
      value: status,
      placeholder: t("allStatuses"),
      onChange: onStatusChange,
      colSpan: 4,
      options: [
        { value: "all", label: t("allStatuses") },
        { value: "SUCCESS", label: t("successOnly") },
        { value: "PENDING", label: t("pendingOnly") },
        { value: "FAILED", label: t("failedOnly") },
        { value: "CANCELLED", label: t("cancelledOnly") },
      ],
    },
    {
      id: "type",
      value: type,
      placeholder: t("allTypes"),
      onChange: onTypeChange,
      colSpan: 4,
      options: [
        { value: "all", label: t("allTypes") },
        { value: "CHARGE", label: t("chargeOnly") },
        { value: "PURCHASE", label: t("purchaseOnly") },
        { value: "REFUND", label: t("refundOnly") },
      ],
    },
  ];

  return (
    <AdminFilters
      filters={filters}
      hasActiveFilters={hasActiveFilters}
      onReset={onResetFilters}
    />
  );
}