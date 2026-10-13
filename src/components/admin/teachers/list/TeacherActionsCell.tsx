"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
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
import { Edit3, MoreVertical, Power, PowerOff, Trash2 } from "lucide-react";
import { useState } from "react";

interface TeacherActionsCellProps {
  teacher: TeacherListItem;
  t: (key: string) => string;
  onEdit: (teacher: TeacherListItem) => void;
}

export function TeacherActionsCell({
  teacher,
  t,
  onEdit,
}: TeacherActionsCellProps) {
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
            <span className="block mt-2 text-xs text-amber-600 dark:text-amber-400 font-semibold">
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
