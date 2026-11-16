"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        <Pagination className="w-auto mx-0">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationLink
                size="icon"
                aria-label="Previous Page"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1 && !isLoading)
                    onPageChange(currentPage - 1);
                }}
                className={cn(
                  "h-8 w-8 rounded-xl cursor-pointer bg-card border border-border/60 hover:bg-muted transition-all",
                  (currentPage <= 1 || isLoading) &&
                    "pointer-events-none opacity-50",
                )}
              >
                {isRtl ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </PaginationLink>
            </PaginationItem>

            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis className="h-8 w-8 flex items-center justify-center text-muted-foreground" />
                  </PaginationItem>
                );
              }

              const isActive = page === currentPage;

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoading && !isActive) onPageChange(page as number);
                    }}
                    isActive={isActive}
                    className={cn(
                      "h-8 w-8 rounded-xl text-xs font-bold cursor-pointer transition-all border",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-xs hover:bg-primary/90 hover:text-primary-foreground"
                        : "bg-card border-border/60 hover:bg-muted text-foreground",
                      isLoading && "pointer-events-none opacity-50",
                    )}
                  >
                    {formatNumber(page as number, locale)}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationLink
                size="icon"
                aria-label="Next Page"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages && !isLoading)
                    onPageChange(currentPage + 1);
                }}
                className={cn(
                  "h-8 w-8 rounded-xl cursor-pointer bg-card border border-border/60 hover:bg-muted transition-all",
                  (currentPage >= totalPages || isLoading) &&
                    "pointer-events-none opacity-50",
                )}
              >
                {isRtl ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
