"use client";

import { useAuthStore } from "@/hooks/authStore";
import { cn } from "@/lib/utils";
import { useCourseReaction, useToggleCourseFavorite } from "@/services";
import type { Course } from "@/types";
import {
  Bookmark,
  Check,
  Loader2,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface CourseActionButtonsProps {
  course: Course;
  slug: string;
}

export function CourseActionButtons({
  course,
  slug,
}: CourseActionButtonsProps) {
  const t = useTranslations("reaction");
  const tFav = useTranslations("favorite");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [copied, setCopied] = useState(false);

  const {
    mutate: toggleReaction,
    isPending: isReacting,
    variables: reactionVars,
  } = useCourseReaction();

  const { mutate: toggleFavorite, isPending: isFavPending } =
    useToggleCourseFavorite({});

  const handleReaction = (type: "LIKE" | "DISLIKE") => {
    if (!isAuthenticated) {
      toast.info(t("loginRequired"));
      return;
    }
    toggleReaction({ id: course.id, type });
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.info(tFav("loginRequired"));
      return;
    }
    toggleFavorite(course.id);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/courses/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: course.title, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("لینک دوره کپی شد");
    setTimeout(() => setCopied(false), 2000);
  };

  const isLikePending = isReacting && reactionVars?.type === "LIKE";
  const isDislikePending = isReacting && reactionVars?.type === "DISLIKE";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full p-1 bg-muted/50 dark:bg-muted/30 border border-border/40 shadow-xs">
        <button
          type="button"
          onClick={() => handleReaction("LIKE")}
          disabled={isReacting}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-50",
            course.reactions?.myReaction === "LIKE"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 shadow-sm"
              : "text-muted-foreground hover:bg-background hover:text-foreground",
          )}
          aria-label={t("like")}
        >
          {isLikePending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ThumbsUp
              className={cn(
                "h-3.5 w-3.5",
                course.reactions?.myReaction === "LIKE" && "fill-current",
              )}
            />
          )}
          <span>{course.reactions?.likes ?? 0}</span>
        </button>

        <button
          type="button"
          onClick={() => handleReaction("DISLIKE")}
          disabled={isReacting}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-50",
            course.reactions?.myReaction === "DISLIKE"
              ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 shadow-sm"
              : "text-muted-foreground hover:bg-background hover:text-foreground",
          )}
          aria-label={t("dislike")}
        >
          {isDislikePending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ThumbsDown
              className={cn(
                "h-3.5 w-3.5",
                course.reactions?.myReaction === "DISLIKE" && "fill-current",
              )}
            />
          )}
          <span>{course.reactions?.dislikes ?? 0}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleFavorite}
        disabled={isFavPending}
        className={cn(
          "flex items-center justify-center h-9 w-9 rounded-full border transition-all cursor-pointer disabled:opacity-50 shadow-xs",
          course.isFavorite
            ? "bg-amber-100 border-amber-300/60 text-amber-600 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-400"
            : "bg-muted/50 border-border/40 text-muted-foreground hover:text-amber-600 hover:border-amber-300/60",
        )}
        aria-label="ذخیره دوره"
      >
        {isFavPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Bookmark
            className={cn("h-4 w-4", course.isFavorite && "fill-current")}
          />
        )}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className={cn(
          "flex items-center justify-center h-9 w-9 rounded-full border transition-all cursor-pointer shadow-xs",
          copied
            ? "bg-emerald-100 border-emerald-300/60 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"
            : "bg-muted/50 border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30",
        )}
        aria-label="اشتراک‌گذاری"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
