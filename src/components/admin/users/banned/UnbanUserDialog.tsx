"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import { useUnbanUser } from "@/services";
import { UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface UnbanUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName?: string;
}

export function UnbanUserDialog({
  open,
  onOpenChange,
  userId,
  userName,
}: UnbanUserDialogProps) {
  const t = useTranslations("admin.users.confirmUnban");

  const { mutate: unbanUser, isPending } = useUnbanUser({
    onSuccessCallback: () => onOpenChange(false),
  });

  return (
    <AdminConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      variant="success"
      icon={UserCheck}
      title={t("title")}
      confirmLabel={t("confirm")}
      cancelLabel={t("cancel")}
      isPending={isPending}
      onConfirm={() => unbanUser(userId)}
      description={
        <>
          {t("description")}
          {userName && (
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {userName}
            </span>
          )}
        </>
      }
    />
  );
}
