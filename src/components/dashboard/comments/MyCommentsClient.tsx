"use client";

import { DashboardPagination } from "@/components/dashboard/shared/DashboardPagination";
import { useDeleteComment, useMyComments } from "@/services";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MyCommentCard } from "./MyCommentCard";
import { MyCommentsCardSkeleton } from "./MyCommentsCardSkeleton";

export function MyCommentsClient() {
  const t = useTranslations("dashboard");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useMyComments({ page, limit: 10 });
  const {
    mutate: deleteComment,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeleteComment();

  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">
            {t("menu.comments")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {pagination?.total
              ? t("commentsCount", { count: pagination.total })
              : t("commentsSubtitle")}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <MyCommentsCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/60 rounded-3xl text-xs text-muted-foreground font-bold bg-card/40">
          {t("empty.comments")}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items?.map((comment, idx) => (
            <MyCommentCard
              key={comment?.id}
              comment={comment}
              onDelete={() => deleteComment(comment?.id)}
              isDeleting={isDeleting && deletingId === comment?.id}
              index={idx}
            />
          ))}
        </div>
      )}

      <DashboardPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isFetching}
      />
    </div>
  );
}
