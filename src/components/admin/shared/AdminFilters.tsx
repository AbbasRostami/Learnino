"use client";

import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSelectConfig {
  id: string;
  value: string;
  placeholder?: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  allValue?: string;
  colSpan?: number;
}

export interface AdminFiltersProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterSelectConfig[];
  hasActiveFilters?: boolean;
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

export function AdminFilters({
  search,
  onSearchChange,
  searchPlaceholder,
  filters = [],
  hasActiveFilters = false,
  onReset,
  resetLabel,
  className,
}: AdminFiltersProps) {
  const t = useTranslations("admin.filters");

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 sm:p-5 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 w-full">
        {onSearchChange !== undefined && (
          <div className="flex-1 min-w-60 sm:min-w-70">
            <AdminSearchInput
              value={search ?? ""}
              onChange={onSearchChange}
              placeholder={searchPlaceholder ?? t("searchPlaceholder")}
            />
          </div>
        )}

        {/* Dynamic Select Filters */}
        {filters.map((filter) => {
          const allValue = filter.allValue ?? "all";
          const currentValue = filter.value || allValue;

          return (
            <div
              key={filter.id}
              className="flex-1 min-w-35 sm:min-w-40 max-w-full"
            >
              <Select
                items={filter.options}
                value={currentValue}
                // 🌟 اصلاح اصلی: با ساخت این تابع واسط، تداخل string و null برطرف می‌شود
                onValueChange={(val) => {
                  if (filter.onChange) {
                    filter.onChange(val ?? ""); 
                  }
                }}
              >
                <SelectTrigger className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60 hover:bg-muted/40 transition-colors px-3.5 justify-between">
                  <SelectValue
                    placeholder={filter.placeholder}
                    className="text-start truncate font-bold text-foreground"
                  />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="rounded-xl min-w-40"
                >
                  <SelectGroup>
                    {filter.options.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs font-bold cursor-pointer py-2"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>

      {/* ── Reset Button ── */}
      {hasActiveFilters && onReset && (
        <div className="flex items-center justify-end border-t border-border/40 pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 gap-1.5 cursor-pointer px-3"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{resetLabel ?? t("clearFilters")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
