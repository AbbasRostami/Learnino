"use client";

import { useAuthStore } from "@/hooks/authStore";
import { cn } from "@/lib/utils";
import { usePostReaction } from "@/services";
import type { PostReactions as PostReactionsType } from "@/types";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface PostReactionsProps {
  postId: string;
  postSlug: string;
  reactions: PostReactionsType;
}

export function PostReactions({
  postId,
  postSlug,
  reactions,
}: PostReactionsProps) {
  const t = useTranslations("reaction");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const {
    mutate: toggleReaction,
    isPending,
    variables,
  } = usePostReaction(postSlug);

  const handleReaction = (type: "LIKE" | "DISLIKE") => {
    if (!isAuthenticated) {
      toast.info(t("loginRequired"));
      return;
    }
    toggleReaction({ id: postId, type });
  };

  const isLikePending = isPending && variables?.type === "LIKE";
  const isDislikePending = isPending && variables?.type === "DISLIKE";

  return (
    <div className="flex items-center gap-1.5 rounded-full p-1 bg-muted/50 dark:bg-muted/30 border border-border/40 shadow-xs">
      <button
        type="button"
        onClick={() => handleReaction("LIKE")}
        disabled={isPending}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-50",
          reactions?.myReaction === "LIKE"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 shadow-sm"
            : "text-muted-foreground hover:bg-background dark:hover:bg-card hover:text-foreground hover:shadow-sm",
        )}
      >
        {isLikePending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsUp
            className={cn(
              "h-3.5 w-3.5",
              reactions?.myReaction === "LIKE" && "fill-current",
            )}
          />
        )}
        <span>{reactions?.likes}</span>
      </button>

      <button
        type="button"
        onClick={() => handleReaction("DISLIKE")}
        disabled={isPending}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-50",
          reactions?.myReaction === "DISLIKE"
            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 shadow-sm"
            : "text-muted-foreground hover:bg-background dark:hover:bg-card hover:text-foreground hover:shadow-sm",
        )}
      >
        {isDislikePending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsDown
            className={cn(
              "h-3.5 w-3.5",
              reactions?.myReaction === "DISLIKE" && "fill-current",
            )}
          />
        )}
        <span>{reactions?.dislikes}</span>
      </button>
    </div>
  );
}
