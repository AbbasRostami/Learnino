"use client";

import { CommentForm } from "@/components/blog/detail/comments/CommentForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCommentReaction } from "@/services";
import { useAuthStore } from "@/store/authStore";
import type { CommentTreeItem } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import { Loader2, Reply, ThumbsDown, ThumbsUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface CourseCommentCardProps {
  comment: CommentTreeItem;
  replyToId: string | null;
  onReply: (id: string | null) => void;
  onSubmitReply: (content: string, parentId: string) => void;
  isSubmitting: boolean;
  depth?: number;
}

export function CourseCommentCard({
  comment,
  replyToId,
  onReply,
  onSubmitReply,
  isSubmitting,
  depth = 0,
}: CourseCommentCardProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const {
    mutate: toggleReaction,
    isPending: isReacting,
    variables,
  } = useCommentReaction();

  const isReplying = replyToId === comment.id;

  const handleReaction = (type: "LIKE" | "DISLIKE") => {
    if (!isAuthenticated) return;
    toggleReaction({ id: comment.id, type });
  };

  const isLikePending =
    isReacting && variables?.type === "LIKE" && variables?.id === comment?.id;
  const isDislikePending =
    isReacting &&
    variables?.type === "DISLIKE" &&
    variables?.id === comment?.id;

  return (
    <div
      className={cn(
        "flex gap-3 focus-within:z-10",
        depth > 0 &&
          "ms-6 sm:ms-10 relative before:absolute before:inset-y-0 before:-inset-s-4 before:w-px before:bg-border/60",
      )}
      itemScope
      itemType="https://schema.org/Comment"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted">
        {comment?.user?.avatar ? (
          <Image
            src={comment?.user?.avatar}
            alt={comment?.user?.name}
            fill
            sizes="40px"
            className="object-cover"
            itemProp="image"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/10 text-primary text-xs font-bold">
            {comment?.user?.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl border border-border/50 bg-card/60 dark:bg-card/30 backdrop-blur-md p-4 transition-all hover:bg-card">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-xs font-bold text-foreground truncate"
              itemProp="author"
            >
              {comment?.user?.name}
            </span>
            <time
              className="text-xs text-muted-foreground shrink-0"
              dateTime={comment?.createdAt}
              itemProp="dateCreated"
            >
              {formatRelativeTime(comment?.createdAt, locale)}
            </time>
          </div>
          <p
            className="text-xs sm:text-sm text-foreground/90 leading-relaxed"
            itemProp="text"
          >
            {comment?.content}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1.5 ms-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => handleReaction("LIKE")}
            disabled={isReacting}
            className={cn(
              "flex items-center gap-1 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 hover:scale-105",
              comment?.reactions?.myReaction === "LIKE"
                ? "bg-emerald-100 text-emerald-700 dark:text-emerald-400"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="پسندیدن"
          >
            {isLikePending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ThumbsUp className="h-3 w-3" aria-hidden="true" />
            )}
            <span>{comment?.reactions?.likes ?? 0}</span>
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={() => handleReaction("DISLIKE")}
            disabled={isReacting}
            className={cn(
              "flex items-center gap-1 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 hover:scale-105",
              comment?.reactions?.myReaction === "DISLIKE"
                ? "bg-rose-100 text-destructive dark:text-rose-400"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="نپسندیدن"
          >
            {isDislikePending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ThumbsDown className="h-3 w-3" aria-hidden="true" />
            )}
            <span>{comment?.reactions?.dislikes ?? 0}</span>
          </Button>

          {isAuthenticated && depth < 2 && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => onReply(isReplying ? null : comment?.id)}
              className="flex items-center gap-1 text-xs font-black text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Reply className="h-3 w-3" aria-hidden="true" />
              <span>{isReplying ? t("cancelReply") : t("submitComment")}</span>
            </Button>
          )}
        </div>

        {isReplying && (
          <div className="mt-3 ms-2">
            <CommentForm
              onSubmit={(content) => onSubmitReply(content, comment?.id)}
              isSubmitting={isSubmitting}
              placeholder={t("replyTo", { name: comment?.user?.name })}
              submitLabel={t("submitComment")}
              autoFocus
            />
          </div>
        )}

        {comment?.replies && comment?.replies.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {comment?.replies?.map((reply) => (
              <CourseCommentCard
                key={reply?.id}
                comment={reply}
                replyToId={replyToId}
                onReply={onReply}
                onSubmitReply={onSubmitReply}
                isSubmitting={isSubmitting}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
