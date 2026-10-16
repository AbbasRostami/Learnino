"use client";

import { formatRelativeTime, formatShortDate } from "@/utils/formatters";

interface AdminDateCellProps {
  dateStr?: string | Date | null;
  locale?: string;
}

export function AdminDateCell({ dateStr, locale = "fa" }: AdminDateCellProps) {
  if (!dateStr) {
    return (
      <span className="text-xs font-semibold text-muted-foreground">-</span>
    );
  }

  return (
    <div className="flex flex-col gap-0.5 min-w-28">
      <span className="text-xs font-semibold text-foreground truncate">
        {formatRelativeTime(dateStr, locale)}
      </span>
      <span className="text-xs text-muted-foreground truncate">
        {formatShortDate(dateStr, locale)}
      </span>
    </div>
  );
}
