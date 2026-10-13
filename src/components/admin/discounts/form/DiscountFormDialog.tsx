"use client";

import { AdminResponsiveDialog } from "@/components/admin/shared";
import { Percent } from "lucide-react";
import { useTranslations } from "next-intl";
import { DiscountForm } from "./DiscountForm";

interface DiscountFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiscountFormDialog({
  open,
  onOpenChange,
}: DiscountFormDialogProps) {
  const t = useTranslations("admin.discounts.form");

  return (
    <AdminResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={Percent}
      title={t("createTitle")}
      description={t("createDescription")}
    >
      <DiscountForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </AdminResponsiveDialog>
  );
}
