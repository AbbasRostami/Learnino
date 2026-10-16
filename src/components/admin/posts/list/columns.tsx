"use client";

import { AdminDateCell } from "@/components/admin/shared";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import { formatNumber } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, EyeOff, FileText, MessageCircle } from "lucide-react";
import Image from "next/image";
import { PostActionsCell } from "./PostActionsCell";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (post: Post) => void;
}

export const getPostsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onEdit,
}: ColumnsProps): ColumnDef<Post>[] => {
  return [
    {
      id: "rowNumber",
      enableSorting: false,
      header: () => (
        <span className="w-4 text-center block text-muted-foreground">#</span>
      ),
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground/80 w-4 text-center block">
          {formatNumber((page - 1) * limit + row.index + 1, locale)}
        </span>
      ),
    },
    {
      id: "post",
      enableSorting: false,
      header: () => <span>{t("table.post")}</span>,
      cell: ({ row }) => {
        const post = row?.original;
        return (
          <div className="flex items-center gap-3 min-w-60">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              {post?.imageUrl ? (
                <Image
                  src={post?.imageUrl}
                  alt={post?.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  quality={85}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {post?.title}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                dir="ltr"
              >
                /{post?.slug}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "category",
      enableSorting: false,
      header: () => <span>{t("table.category")}</span>,
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black truncate min-w-28 max-w-48">
          {row?.original?.category?.name || "—"}
        </span>
      ),
    },
    {
      id: "comments",
      enableSorting: false,
      header: () => <span>{t("table.comments")}</span>,
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 text-xs font-black">
          <MessageCircle className="h-3 w-3" />
          <span>
            {formatNumber(row?.original.stats?.comments ?? 0, locale)}
          </span>
        </div>
      ),
    },
    {
      id: "status",
      enableSorting: false,
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const published = row?.original.published;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border",
              published
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
            )}
          >
            {published ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            <span>{published ? t("status.published") : t("status.draft")}</span>
          </span>
        );
      },
    },
    {
      id: "createdAt",
      enableSorting: false,
      header: () => <span>{t("table.createdAt")}</span>,
      cell: ({ row }) => (
        <AdminDateCell dateStr={row?.original?.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <PostActionsCell post={row?.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};
