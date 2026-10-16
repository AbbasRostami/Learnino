"use client";

import { AdminDateCell, AdminSortableHeader } from "@/components/admin/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { TeacherListItem } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { TeacherActionsCell } from "./TeacherActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (teacher: TeacherListItem) => void;
}

export const getTeachersColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onEdit,
}: ColumnsProps): ColumnDef<TeacherListItem>[] => {
  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-8 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-8 text-center block">
          {formatNumber((page - 1) * limit + row.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "teacher",
      accessorKey: "name",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.teacher")} />
      ),
      cell: ({ row }) => {
        const teacher = row.original;
        const displayName = teacher?.name || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border shadow-xs shrink-0">
              <AvatarImage src={teacher?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {displayName}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                dir="ltr"
              >
                /{teacher?.slug}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "bio",
      accessorKey: "bio",
      enableSorting: false,
      header: () => <span>{t("table.bio")}</span>,
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-2 max-w-xs font-semibold">
          {row.original?.bio || "—"}
        </span>
      ),
    },
    {
      id: "coursesCount",
      accessorKey: "coursesCount",
      enableSorting: true,
      header: ({ column }) => (
        <AdminSortableHeader column={column} label={t("table.courses")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black">
          <BookOpen className="h-3 w-3" />
          <span>{formatNumber(row.original?.coursesCount ?? 0, locale)}</span>
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
        const isActive = row.original?.show;
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
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <TeacherActionsCell teacher={row.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};
