"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { FlatCommentItem } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  Loader2,
  MessageCircle,
  Reply,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const STATUS_STYLES = {
  PENDING: {
    borderColor: "border-amber-500/30",
    ribbonBg: "bg-linear-to-r from-amber-500/10 to-transparent",
    badgeColor:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    Icon: Clock,
  },
  APPROVED: {
    borderColor: "border-emerald-500/30",
    ribbonBg: "bg-linear-to-r from-emerald-500/10 to-transparent",
    badgeColor:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    Icon: CheckCircle2,
  },
  REJECTED: {
    borderColor: "border-rose-500/30",
    ribbonBg: "bg-linear-to-r from-rose-500/10 to-transparent",
    badgeColor:
      "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    Icon: XCircle,
  },
};

interface MyCommentCardProps {
  comment: FlatCommentItem;
  onDelete: () => void;
  isDeleting: boolean;
  index: number;
}

export function MyCommentCard({
  comment,
  onDelete,
  isDeleting,
  index,
}: MyCommentCardProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const status = comment?.status as keyof typeof STATUS_STYLES;
  const style = STATUS_STYLES[status] || STATUS_STYLES.APPROVED;

  const isCourseComment = Boolean(comment?.course);
  const isPostComment = Boolean(comment?.post);

  const targetTitle =
    comment?.course?.title || comment?.post?.title || t("defaultCommentTarget");
  const targetLink = isCourseComment
    ? `/courses/${comment?.course?.slug}`
    : isPostComment
      ? `/blog/${comment?.post?.slug}`
      : "#";
  const targetLabel = isCourseComment
    ? t("onCourse")
    : isPostComment
      ? t("onPost")
      : "";

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border bg-card/60 backdrop-blur-md shadow-xs hover:shadow-lg transition-all",
        style.borderColor,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-dashed border-border/60",
          style.ribbonBg,
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border",
              isCourseComment
                ? "bg-primary/10 border-primary/30 text-primary"
                : isPostComment
                  ? "bg-brand-accent/10 border-brand-accent/30 text-brand-accent"
                  : "bg-muted border-border text-muted-foreground",
            )}
          >
            {isCourseComment ? (
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            ) : isPostComment ? (
              <FileText className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {t("commentOn")} {targetLabel}
            </span>
            {targetLink !== "#" ? (
              <Link
                href={targetLink}
                className="text-xs sm:text-sm font-black text-foreground hover:text-primary transition-colors truncate max-w-full"
                title={targetTitle}
              >
                {targetTitle}
              </Link>
            ) : (
              <span className="text-xs sm:text-sm font-black text-foreground truncate">
                {targetTitle}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            "shrink-0 inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full border",
            style.badgeColor,
          )}
        >
          <style.Icon className="h-3 w-3" aria-hidden="true" />
          <span className="hidden sm:inline">
            {t(`commentStatus.${status}`)}
          </span>
        </div>
      </div>

      <div className="relative p-4 sm:p-5">
        <div
          className="absolute top-2 inset-s-3 text-6xl font-serif text-primary/10 leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          “
        </div>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed relative z-10 ps-6">
          {comment?.content}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-dashed border-border/60 bg-muted/20">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1">
            <Reply className="h-3 w-3" aria-hidden="true" />
            <span>
              {comment?.stats?.replies ?? 0} {t("replies")}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" aria-hidden="true" />
            <span>
              {comment?.stats?.reactions ?? 0} {t("reactions")}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{formatRelativeTime(comment?.createdAt, locale)}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {targetLink !== "#" && (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2.5 rounded-lg text-xs font-bold text-primary hover:bg-primary/10 cursor-pointer gap-1"
            >
              <Link href={targetLink}>
                <span>{t("viewSource")}</span>
              </Link>
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="h-7 px-2.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-500/10 cursor-pointer gap-1 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3" />
            )}
            <span>{t("remove")}</span>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
