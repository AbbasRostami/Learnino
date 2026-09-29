"use client";

import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeleteTeacher, useToggleTeacherVisibility } from "@/services";
import type { TeacherListItem } from "@/types";
import {
  formatNumber,
  formatRelativeTime,
  formatShortDate,
} from "@/utils/formatters";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Edit3,
  Eye,
  EyeOff,
  MoreVertical,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (teacher: TeacherListItem) => void;
}

function SortableHeader<TData>({
  column,
  label,
}: {
  column: Column<TData, unknown>;
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer font-bold select-none"
    >
      <span>{label}</span>
      {sorted === "asc" ? (
        <ArrowUp className="h-3 w-3 text-primary" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3 w-3 text-primary" />
      ) : (
        <ArrowUpDown className="h-3 w-3 text-muted-foreground/60" />
      )}
    </button>
  );
}

function DateCell({
  dateStr,
  locale,
}: {
  dateStr?: string | null;
  locale: string;
}) {
  if (!dateStr) return <span className="text-xs text-muted-foreground">—</span>;

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-xs font-semibold text-foreground"
        suppressHydrationWarning
      >
        {formatRelativeTime(dateStr, locale)}
      </span>
      <span
        className="text-[10px] text-muted-foreground font-mono"
        suppressHydrationWarning
      >
        {formatShortDate(dateStr, locale)}
      </span>
    </div>
  );
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
        <span className="w-8 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-8 text-center block">
          {formatNumber((page - 1) * limit + row.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "teacher",
      accessorKey: "name",
      enableSorting: true,
      header: ({ column }) => (
        <SortableHeader column={column} label={t("table.teacher")} />
      ),
      cell: ({ row }) => {
        const teacher = row.original;
        const displayName = teacher?.name || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-55">
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
                className="text-[10px] text-muted-foreground truncate font-mono"
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
        <SortableHeader column={column} label={t("table.courses")} />
      ),
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-black">
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
        <SortableHeader column={column} label={t("table.visibility")} />
      ),
      cell: ({ row }) => {
        const isActive = row.original?.show;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <SortableHeader column={column} label={t("table.createdAt")} />
      ),
      cell: ({ row }) => (
        <DateCell dateStr={row.original?.createdAt} locale={locale} />
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

function TeacherActionsCell({
  teacher,
  t,
  onEdit,
}: {
  teacher: TeacherListItem;
  t: (key: string) => string;
  onEdit: (teacher: TeacherListItem) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const isActive = teacher?.show;

  const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  const { mutate: toggleVisibility, isPending: isToggling } =
    useToggleTeacherVisibility({
      onSuccessCallback: () => setToggleOpen(false),
    });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => onEdit(teacher)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Edit3 className="h-4 w-4 text-primary" />
            <span>{t("actions.edit")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setToggleOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isActive
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isActive ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
            <span>
              {isActive ? t("actions.deactivate") : t("actions.activate")}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" />
            <span>{t("actions.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deleteTeacher(teacher?.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {teacher?.name}
            </span>
            <span className="block mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
              ⚠️ {t("confirmDelete.warning")}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={toggleOpen}
        onOpenChange={setToggleOpen}
        variant={isActive ? "warning" : "success"}
        icon={isActive ? PowerOff : Power}
        title={
          isActive
            ? t("confirmToggle.deactivateTitle")
            : t("confirmToggle.activateTitle")
        }
        confirmLabel={
          isActive
            ? t("confirmToggle.confirmDeactivate")
            : t("confirmToggle.activateTitle")
        }
        cancelLabel={t("confirmToggle.cancel")}
        isPending={isToggling}
        onConfirm={() => toggleVisibility({ id: teacher?.id, show: !isActive })}
        description={
          <>
            {isActive
              ? t("confirmToggle.deactivateDescription")
              : t("confirmToggle.activateDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {teacher?.name}
            </span>
          </>
        }
      />
    </>
  );
}
