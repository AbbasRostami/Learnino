"use client";

import { AdminResponsiveDialog } from "@/components/admin/shared";
import type { Post } from "@/types";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { PostForm } from "./PostForm";

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post | null;
}

export function PostFormDialog({
  open,
  onOpenChange,
  post,
}: PostFormDialogProps) {
  const t = useTranslations("admin.posts.form");
  const isEdit = Boolean(post);

  return (
    <AdminResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={FileText}
      title={isEdit ? t("editTitle") : t("createTitle")}
      description={isEdit ? t("editDescription") : t("createDescription")}
      className="max-w-4xl"
    >
      <PostForm
        post={post}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </AdminResponsiveDialog>
  );
}