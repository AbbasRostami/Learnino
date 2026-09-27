"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { AdminEmptyState } from "./AdminEmptyState";
import { AdminTableSkeleton } from "./AdminTableSkeleton";

interface AdminDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  emptyStateActionLabel?: string;
  emptyStateActionHref?: string;
  toolbar?: ReactNode;
  enableColumnVisibility?: boolean;
  enableSorting?: boolean;
}

export function AdminDataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  emptyStateMessage,
  emptyStateDescription,
  emptyStateActionLabel,
  emptyStateActionHref,
  toolbar,
  enableColumnVisibility = false,
  enableSorting = false,
}: AdminDataTableProps<TData, TValue>) {
  const t = useTranslations("admin.table");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {(toolbar || enableColumnVisibility) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {toolbar && <div className="flex-1 w-full">{toolbar}</div>}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-border bg-card text-xs font-bold cursor-pointer hover:bg-muted transition-colors shrink-0">
                <Settings2 className="h-4 w-4" />
                <span>{t("columnsVisibility")}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl p-1.5 w-48"
              >
                {table
                  .getAllColumns()
                  .filter((c) => c.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(v) => column.toggleVisibility(!!v)}
                      className="text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-start align-middle font-bold text-muted-foreground whitespace-nowrap text-xs uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
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
                    className="border-border/40 hover:bg-muted/30 transition-colors cursor-default"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="p-4 align-middle text-sm font-medium"
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
                    <AdminEmptyState
                      message={emptyStateMessage || t("noData")}
                      description={emptyStateDescription}
                      actionLabel={emptyStateActionLabel}
                      actionHref={emptyStateActionHref}
                    />
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
