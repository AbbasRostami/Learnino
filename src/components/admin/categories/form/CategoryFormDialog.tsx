"use client";

import { AdminResponsiveDialog } from "@/components/admin/shared/AdminResponsiveDialog";
import type { CategoryWithCount } from "@/types";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { CategoryForm } from "./CategoryForm";

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CategoryWithCount | null;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const t = useTranslations("admin.categories.form");
  const isEdit = Boolean(category);

  return (
    <AdminResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={Sparkles}
      title={isEdit ? t("editTitle") : t("createTitle")}
      description={isEdit ? t("editDescription") : t("createDescription")}
    >
      <CategoryForm
        category={category}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </AdminResponsiveDialog>
  );
}
