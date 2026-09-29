"use client";

import { AdminResponsiveDialog } from "@/components/admin/shared/AdminResponsiveDialog";
import type { TeacherListItem } from "@/types";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { TeacherForm } from "./TeacherForm";

interface TeacherFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher?: TeacherListItem | null;
}

export function TeacherFormDialog({
  open,
  onOpenChange,
  teacher,
}: TeacherFormDialogProps) {
  const t = useTranslations("admin.teachers.form");
  const isEdit = Boolean(teacher);

  return (
    <AdminResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={GraduationCap}
      title={isEdit ? t("editTitle") : t("createTitle")}
      description={isEdit ? t("editDescription") : t("createDescription")}
      className="sm:max-w-2xl"
    >
      <TeacherForm
        teacher={teacher}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </AdminResponsiveDialog>
  );
}