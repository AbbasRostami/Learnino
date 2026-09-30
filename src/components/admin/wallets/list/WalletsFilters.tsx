"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

interface WalletsFiltersProps {
  search: string;
  minBalance: number;
  maxBalance: number;
  onSearchChange: (value: string) => void;
  onMinBalanceChange: (value: number | null) => void;
  onMaxBalanceChange: (value: number | null) => void;
  onResetFilters: () => void;
}

export function WalletsFilters({
  search,
  minBalance,
  maxBalance,
  onSearchChange,
  onMinBalanceChange,
  onMaxBalanceChange,
  onResetFilters,
}: WalletsFiltersProps) {
  const t = useTranslations("admin.wallets.filters");

  const hasActiveFilters = Boolean(search) || minBalance > 0 || maxBalance > 0;

  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="sm:col-span-2 lg:col-span-6">
          <AdminSearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={t("searchPlaceholder")}
          />
        </div>

        <div className="lg:col-span-3">
          <Input
            type="number"
            min={0}
            value={minBalance || ""}
            onChange={(e) =>
              onMinBalanceChange(e.target.value ? Number(e.target.value) : null)
            }
            placeholder={t("minBalancePlaceholder")}
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
          />
        </div>

        <div className="lg:col-span-3">
          <Input
            type="number"
            min={0}
            value={maxBalance || ""}
            onChange={(e) =>
              onMaxBalanceChange(e.target.value ? Number(e.target.value) : null)
            }
            placeholder={t("maxBalancePlaceholder")}
            className="h-11 rounded-xl text-xs font-bold font-mono bg-background border-border/60"
            dir="ltr"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-end border-t border-border/40 pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-8 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 gap-1.5 cursor-pointer px-3"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t("clearFilters")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
