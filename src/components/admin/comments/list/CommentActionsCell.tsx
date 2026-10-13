"use client";

import { AdminConfirmDialog } from "@/components/admin/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useApproveComment,
  useDeleteComment,
  useRejectComment,
} from "@/services";
import type { FlatCommentItem } from "@/types";
import { CheckCircle2, MoreVertical, Trash2, XCircle } from "lucide-react";
import { useState } from "react";

interface CommentActionsCellProps {
  comment: FlatCommentItem;
  t: (key: string) => string;
}

export function CommentActionsCell({ comment, t }: CommentActionsCellProps) {
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const status = comment?.status;
  const canApprove = status !== "APPROVED";
  const canReject = status !== "REJECTED";

  const { mutate: approveComment, isPending: isApproving } = useApproveComment({
    onSuccessCallback: () => setApproveOpen(false),
  });

  const { mutate: rejectComment, isPending: isRejecting } = useRejectComment({
    onSuccessCallback: () => setRejectOpen(false),
  });

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 rounded-2xl p-1.5 z-50"
        >
          {canApprove && (
            <DropdownMenuItem
              onClick={() => setApproveOpen(true)}
              className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("actions.approve")}</span>
            </DropdownMenuItem>
          )}

          {canReject && (
            <DropdownMenuItem
              onClick={() => setRejectOpen(true)}
              className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
            >
              <XCircle className="h-4 w-4" />
              <span>{t("actions.reject")}</span>
            </DropdownMenuItem>
          )}

          {(canApprove || canReject) && (
            <DropdownMenuSeparator className="my-1" />
          )}

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
        open={approveOpen}
        onOpenChange={setApproveOpen}
        variant="success"
        icon={CheckCircle2}
        title={t("confirmApprove.title")}
        confirmLabel={t("confirmApprove.confirm")}
        cancelLabel={t("confirmApprove.cancel")}
        isPending={isApproving}
        onConfirm={() => approveComment(comment?.id)}
        description={
          <>
            {t("confirmApprove.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs line-clamp-3">
              {comment?.content}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        variant="warning"
        icon={XCircle}
        title={t("confirmReject.title")}
        confirmLabel={t("confirmReject.confirm")}
        cancelLabel={t("confirmReject.cancel")}
        isPending={isRejecting}
        onConfirm={() => rejectComment(comment?.id)}
        description={
          <>
            {t("confirmReject.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs line-clamp-3">
              {comment?.content}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deleteComment(comment?.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold text-xs line-clamp-3">
              {comment?.content}
            </span>
          </>
        }
      />
    </>
  );
}
