"use client";

import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface AdminSortableHeaderProps<TData, TValue = unknown> {
  column: Column<TData, TValue>;
  label: string;
  className?: string;
}

export function AdminSortableHeader<TData, TValue = unknown>({
  column,
  label,
  className,
}: AdminSortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 font-bold text-xs transition-colors",
        className,
      )}
    >
      <span>{label}</span>
      {sorted === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5 text-primary shrink-0 transition-transform" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5 text-primary shrink-0 transition-transform" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
      )}
    </div>
  );
}
