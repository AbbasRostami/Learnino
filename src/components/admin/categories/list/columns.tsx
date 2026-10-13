"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { cn } from "@/lib/utils";
import type { CategoryWithCount } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { BookOpen, Eye, EyeOff, FileText } from "lucide-react";
import { CategoryActionsCell } from "./CategoryActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (category: CategoryWithCount) => void;
}

export const getCategoriesColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onEdit,
}: ColumnsProps): ColumnDef<CategoryWithCount>[] => {
  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
          {formatNumber((page - 1) * limit + row?.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.name")} />
      ),
      cell: ({ row }) => {
        const cat = row?.original;
        return (
          <div className="flex flex-col gap-1 min-w-40">
            <span className="text-sm font-black text-foreground truncate">
              {cat?.name}
            </span>
            <span className="text-xs text-muted-foreground truncate" dir="ltr">
              /{cat?.slug}
            </span>
          </div>
        );
      },
    },
    {
      id: "description",
      accessorKey: "description",
      enableSorting: false,
      header: () => <span>{t("table.description")}</span>,
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-2 max-w-xs font-semibold">
          {row?.original?.description || "—"}
        </span>
      ),
    },
    {
      id: "coursesCount",
      accessorFn: (row) => row._count?.courses ?? 0,
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("stats.courses")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black">
          <BookOpen className="h-3 w-3" />
          <span>
            {formatNumber(row.original?._count?.courses ?? 0, locale)}
          </span>
        </div>
      ),
    },
    {
      id: "postsCount",
      accessorFn: (row) => row._count?.posts ?? 0,
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("stats.posts")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-black">
          <FileText className="h-3 w-3" />
          <span>{formatNumber(row?.original?._count?.posts ?? 0, locale)}</span>
        </div>
      ),
    },
    {
      id: "visibility",
      accessorKey: "show",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.visibility")} />
      ),
      cell: ({ row }) => {
        const isActive = row?.original?.show;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              isActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
            )}
          >
            {isActive ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            <span>{isActive ? t("status.active") : t("status.inactive")}</span>
          </span>
        );
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.updatedAt")} />
      ),
      cell: ({ row }) => (
        <AdminDateCell dateStr={row?.original?.updatedAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <CategoryActionsCell category={row?.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};
