"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type SortingState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { AdminEmptyState } from "./AdminEmptyState";
import { AdminQueryError } from "./AdminQueryError";
import { AdminTableSkeleton } from "./AdminTableSkeleton";

interface AdminDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  emptyStateActionLabel?: string;
  emptyStateActionHref?: string;
  toolbar?: ReactNode;
  enableSorting?: boolean;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

export function AdminDataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isError = false,
  onRetry,
  emptyStateMessage,
  emptyStateDescription,
  emptyStateActionLabel,
  emptyStateActionHref,
  toolbar,
  enableSorting = true,
  sorting,
  onSortingChange,
}: AdminDataTableProps<TData, TValue>) {
  const t = useTranslations("admin.table");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    enableSorting,
    onSortingChange,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {toolbar && <div className="w-full">{toolbar}</div>}

      {isError && data.length > 0 && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5">
          <AdminQueryError onRetry={onRetry} />
        </div>
      )}

      <div className="w-full overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-border/40 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();

                    return (
                      <TableHead
                        key={header.id}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={cn(
                          "h-12 px-4 text-start align-middle font-bold text-muted-foreground whitespace-nowrap text-xs uppercase tracking-wider transition-colors",
                          canSort &&
                            "cursor-pointer select-none hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <AdminTableSkeleton columnCount={columns.length} rowCount={5} />
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-border/40 hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="p-2.5 align-middle text-sm font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center align-middle"
                  >
                    {isError ? (
                      <AdminQueryError onRetry={onRetry} />
                    ) : (
                      <AdminEmptyState
                        message={emptyStateMessage || t("noData")}
                        description={emptyStateDescription}
                        actionLabel={emptyStateActionLabel}
                        actionHref={emptyStateActionHref}
                      />
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
