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
import { useDeleteCourse, useToggleCoursePublish } from "@/services";
import type { Course } from "@/types";
import { Edit3, Eye, EyeOff, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

interface CourseActionsCellProps {
  course: Course;
  t: (key: string) => string;
  onEdit: (course: Course) => void;
}

export function CourseActionsCell({
  course,
  t,
  onEdit,
}: CourseActionsCellProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const isPublished = course?.published;

  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  const { mutate: togglePublish, isPending: isToggling } =
    useToggleCoursePublish({
      onSuccessCallback: () => setPublishOpen(false),
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
            onClick={() => onEdit(course)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Edit3 className="h-4 w-4 text-primary" />
            <span>{t("actions.edit")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPublishOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isPublished
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isPublished ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>
              {isPublished ? t("actions.unpublish") : t("actions.publish")}
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
        onConfirm={() => deleteCourse(course?.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs truncate max-w-full">
              {course?.title}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        variant={isPublished ? "warning" : "success"}
        icon={isPublished ? EyeOff : Eye}
        title={
          isPublished
            ? t("confirmPublish.unpublishTitle")
            : t("confirmPublish.publishTitle")
        }
        confirmLabel={
          isPublished
            ? t("confirmPublish.confirmUnpublish")
            : t("confirmPublish.confirmPublish")
        }
        cancelLabel={t("confirmPublish.cancel")}
        isPending={isToggling}
        onConfirm={() =>
          togglePublish({ id: course?.id, published: !isPublished })
        }
        description={
          <>
            {isPublished
              ? t("confirmPublish.unpublishDescription")
              : t("confirmPublish.publishDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs truncate max-w-full">
              {course?.title}
            </span>
          </>
        }
      />
    </>
  );
}
