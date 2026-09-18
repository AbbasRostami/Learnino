"use client";

import { useAuthStore } from "@/hooks/authStore";
import { cn } from "@/lib/utils";
import { useCommentReaction } from "@/services";
import type { CommentTreeItem } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import { Loader2, Reply, ThumbsDown, ThumbsUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CommentForm } from "./CommentForm";

interface CommentCardProps {
  comment: CommentTreeItem;
  replyToId: string | null;
  onReply: (id: string | null) => void;
  onSubmitReply: (content: string, parentId: string) => void;
  isSubmitting: boolean;
  depth?: number;
}

export function CommentCard({
  comment,
  replyToId,
  onReply,
  onSubmitReply,
  isSubmitting,
  depth = 0,
}: CommentCardProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const {
    mutate: toggleReaction,
    isPending: isReacting,
    variables,
  } = useCommentReaction();

  const isReplying = replyToId === comment.id;
  const isLikePending = isReacting && variables?.type === "LIKE";
  const isDislikePending = isReacting && variables?.type === "DISLIKE";

  const handleReaction = (type: "LIKE" | "DISLIKE") => {
    if (!isAuthenticated) return;
    toggleReaction({ id: comment.id, type });
  };

  return (
    <div className={cn("flex gap-3", depth > 0 && "ms-8 sm:ms-12")}>
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-background bg-primary/5 dark:bg-primary/10 shadow-sm">
        {comment?.user?.avatar ? (
          <Image
            src={comment?.user?.avatar}
            alt={comment?.user?.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary text-sm font-bold">
            {comment?.user?.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="rounded-2xl border border-border/50 bg-card shadow-xs dark:bg-card/80 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-bold text-foreground truncate">
              {comment?.user?.name}
            </span>
            <time className="text-xs font-medium text-muted-foreground shrink-0">
              {formatRelativeTime(comment?.createdAt, locale)}
            </time>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {comment?.content}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2 ms-2">
          <button
            type="button"
            onClick={() => handleReaction("LIKE")}
            disabled={isReacting}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors cursor-pointer disabled:opacity-50",
              comment?.reactions?.myReaction === "LIKE"
                ? "text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400",
            )}
          >
            {isLikePending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ThumbsUp
                className={cn(
                  "h-3.5 w-3.5",
                  comment?.reactions?.myReaction === "LIKE" && "fill-current",
                )}
              />
            )}
            <span>{comment?.reactions?.likes}</span>
          </button>

          <button
            type="button"
            onClick={() => handleReaction("DISLIKE")}
            disabled={isReacting}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors cursor-pointer disabled:opacity-50",
              comment?.reactions?.myReaction === "DISLIKE"
                ? "text-rose-600 dark:text-rose-400 font-bold"
                : "text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400",
            )}
          >
            {isDislikePending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ThumbsDown
                className={cn(
                  "h-3.5 w-3.5",
                  comment?.reactions?.myReaction === "DISLIKE" &&
                    "fill-current",
                )}
              />
            )}
            <span>{comment?.reactions?.dislikes}</span>
          </button>

          {isAuthenticated && depth < 2 && (
            <button
              type="button"
              onClick={() => onReply(isReplying ? null : comment?.id)}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>{isReplying ? t("cancelReply") : t("submitComment")}</span>
            </button>
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

        {comment?.replies && comment?.replies?.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {comment?.replies?.map((reply) => (
              <CommentCard
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
