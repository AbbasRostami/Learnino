"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatters";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface AdminPaginationProps {
  currentPage: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
}

const PAGE_SIZE_OPTIONS = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

export function AdminPagination({
  currentPage,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
  isLoading = false,
}: AdminPaginationProps) {
  const t = useTranslations("admin.table");
  const locale = useLocale();

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const isRtl = locale === "fa";

  if (totalCount === 0) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 px-2 text-xs">
      <div className="flex flex-wrap items-center gap-3 text-muted-foreground font-semibold">
        <span>
          {t("showing")} {formatNumber(startItem, locale)} {t("to")}{" "}
          {formatNumber(endItem, locale)} {t("of")}{" "}
          {formatNumber(totalCount, locale)} {t("items")}
        </span>

        <div className="h-4 w-px bg-border/60 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span>{t("rowsPerPage")}:</span>
          <Select
            items={PAGE_SIZE_OPTIONS}
            value={String(limit)}
            onValueChange={(val) => {
              onLimitChange(Number(val));
              onPageChange(1);
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="h-8 w-16 text-xs rounded-lg border-border/60 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              className="rounded-xl min-w-16"
            >
              <SelectGroup>
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs cursor-pointer"
                  >
                    {formatNumber(Number(opt.value))}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
          className="h-8 w-8 rounded-xl cursor-pointer bg-card border-border/60 hover:bg-muted"
          aria-label="Previous Page"
        >
          {isRtl ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="h-8 w-8 flex items-center justify-center text-muted-foreground"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </div>
              );
            }

            const isActive = page === currentPage;

            return (
              <Button
                key={page}
                variant={isActive ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                className={cn(
                  "h-8 w-8 rounded-xl text-xs font-bold cursor-pointer transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card border-border/60 hover:bg-muted text-foreground",
                )}
              >
                {formatNumber(page as number)}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="h-8 w-8 rounded-xl cursor-pointer bg-card border-border/60 hover:bg-muted"
          aria-label="Next Page"
        >
          {isRtl ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
