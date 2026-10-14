"use client";

import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface AdminSortableHeaderProps<TData, TValue = unknown> {
  column: Column<TData, TValue>;
  label: string;
  className?: string;
  onSortChange?: (field: string) => void;
  field?: string;
}

export function AdminSortableHeader<TData, TValue = unknown>({
  column,
  label,
  className,
  onSortChange,
  field,
}: AdminSortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  const handleClick = () => {
    if (onSortChange && field) {
      onSortChange(field);
    } else {
      column.toggleSorting(sorted === "asc");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none text-xs",
        className,
      )}
    >
      <span>{label}</span>
      {sorted === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5 text-primary" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5 text-primary" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
      )}
    </button>
  );
}