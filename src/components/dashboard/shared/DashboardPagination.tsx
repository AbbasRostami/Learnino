"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: DashboardPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-border/40">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className="h-9 w-9 rounded-xl cursor-pointer"
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180" />
      </Button>

      <span className="text-xs font-bold text-muted-foreground px-3">
        صفحه {currentPage} از {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        className="h-9 w-9 rounded-xl cursor-pointer"
        aria-label="صفحه بعدی"
      >
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  );
}
