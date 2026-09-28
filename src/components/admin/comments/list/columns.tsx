"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { FlatCommentItem } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageCircle,
  Reply,
  ThumbsUp,
  XCircle,
} from "lucide-react";
import { CommentActionsCell } from "./CommentActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
}

function DateCell({
  dateStr,
  locale,
}: {
  dateStr: string | null | undefined;
  locale: string;
}) {
  if (!dateStr) return <span className="text-xs text-muted-foreground">—</span>;

  const date = new Date(dateStr);
  const relative = formatRelativeTime(dateStr, locale);
  const exact = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-xs font-semibold text-foreground"
        suppressHydrationWarning
      >
        {relative}
      </span>
      <span
        className="text-[10px] text-muted-foreground font-mono"
        suppressHydrationWarning
      >
        {exact}
      </span>
    </div>
  );
}

export const getCommentsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 20,
}: ColumnsProps): ColumnDef<FlatCommentItem>[] => {
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);

  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground font-mono">
          #
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-mono font-bold text-muted-foreground/80 w-4 text-center block">
          {fmt((page - 1) * limit + row.index + 1)}
        </span>
      ),
    },
    {
      id: "user",
      enableSorting: false,
      header: () => <span>{t("table.user")}</span>,
      cell: ({ row }) => {
        const user = row.original?.user;
        const displayName = user?.name || "—";
        const initial = displayName.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3 min-w-40">
            <Avatar className="h-9 w-9 border border-border shadow-xs">
              <AvatarImage src={user?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-[10px]">
                {initial}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-black text-foreground truncate">
              {displayName}
            </span>
          </div>
        );
      },
    },
    {
      id: "comment",
      enableSorting: false,
      header: () => <span>{t("table.comment")}</span>,
      cell: ({ row }) => {
        const comment = row.original;
        const isLong = (comment?.content?.length ?? 0) > 80;

        return (
          <div className="flex flex-col gap-1.5 min-w-60 max-w-sm">
            {isLong ? (
              <Popover>
                <PopoverTrigger className="text-start focus:outline-none group cursor-pointer">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                    {comment?.content}
                  </p>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-80 rounded-2xl p-4 shadow-xl text-xs font-medium leading-relaxed bg-card border-border/60"
                >
                  <p className="whitespace-pre-wrap text-foreground">
                    {comment?.content}
                  </p>
                </PopoverContent>
              </Popover>
            ) : (
              <p className="text-xs font-semibold text-foreground leading-relaxed">
                {comment?.content}
              </p>
            )}

            {comment?.parent && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                <Reply className="h-3 w-3 shrink-0" />
                <span className="truncate max-w-44">
                  {t("table.replyTo")}: {comment.parent.content}
                </span>
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "target",
      enableSorting: false,
      header: () => <span>{t("table.target")}</span>,
      cell: ({ row }) => {
        const course = row.original?.course;
        const post = row.original?.post;

        if (course) {
          return (
            <div className="flex flex-col gap-1 min-w-36">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary">
                <BookOpen className="h-3 w-3" />
                <span>{t("table.onCourse")}</span>
              </span>
              <Link
                href={`/courses/${course.slug}`}
                target="_blank"
                className="group inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-primary transition-colors max-w-44"
              >
                <span className="truncate">{course.title}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          );
        }

        if (post) {
          return (
            <div className="flex flex-col gap-1 min-w-36">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-brand-accent">
                <FileText className="h-3 w-3" />
                <span>{t("table.onPost")}</span>
              </span>
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="group inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-brand-accent transition-colors max-w-44"
              >
                <span className="truncate">{post.title}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          );
        }

        return <span className="text-xs text-muted-foreground">—</span>;
      },
    },
    {
      id: "stats",
      enableSorting: false,
      header: () => <span>{t("table.stats")}</span>,
      cell: ({ row }) => {
        const stats = row.original?.stats;
        return (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-bold">
            <span
              className="flex items-center gap-1"
              title={t("stats.replies")}
            >
              <MessageCircle className="h-3 w-3 text-brand-cyan" />
              <span>{fmt(stats?.replies ?? 0)}</span>
            </span>
            <span
              className="flex items-center gap-1"
              title={t("stats.reactions")}
            >
              <ThumbsUp className="h-3 w-3 text-primary" />
              <span>{fmt(stats?.reactions ?? 0)}</span>
            </span>
          </div>
        );
      },
    },
    {
      id: "status",
      enableSorting: false,
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const status = row.original?.status ?? "PENDING";
        const styles: Record<string, string> = {
          PENDING:
            "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          APPROVED:
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          REJECTED:
            "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        };
        const icons: Record<string, typeof CheckCircle2> = {
          PENDING: MessageCircle,
          APPROVED: CheckCircle2,
          REJECTED: XCircle,
        };
        const Icon = icons[status] || MessageCircle;

        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
              styles[status] || "bg-muted text-muted-foreground border-border",
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{t(`status.${status}`)}</span>
          </span>
        );
      },
    },
    {
      id: "createdAt",
      enableSorting: false,
      header: () => <span>{t("table.createdAt")}</span>,
      cell: ({ row }) => (
        <DateCell dateStr={row.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => <CommentActionsCell comment={row.original} t={t} />,
    },
  ];
};
