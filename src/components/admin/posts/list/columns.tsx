"use client";

import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDeletePost, useTogglePostPublish } from "@/services";
import type { Post } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Edit3,
  Eye,
  EyeOff,
  FileText,
  MessageCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ColumnsProps {
  t: (key: string) => string;
  locale?: string;
  page?: number;
  limit?: number;
  onEdit: (post: Post) => void;
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

export const getPostsColumns = ({
  t,
  locale = "fa",
  page = 1,
  limit = 10,
  onEdit,
}: ColumnsProps): ColumnDef<Post>[] => {
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
      id: "post",
      enableSorting: false,
      header: () => <span>{t("table.post")}</span>,
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div className="flex items-center gap-3 min-w-60">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-foreground truncate">
                {post.title}
              </span>
              <span
                className="text-[10px] text-muted-foreground truncate font-mono"
                dir="ltr"
              >
                /{post.slug}
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
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border text-[10px] font-black truncate min-w-28 max-w-48">
          {row.original.category?.name || "—"}
        </span>
      ),
    },
    {
      id: "comments",
      enableSorting: false,
      header: () => <span>{t("table.comments")}</span>,
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 text-[11px] font-black">
          <MessageCircle className="h-3 w-3" />
          <span>{fmt(row.original.stats?.comments ?? 0)}</span>
        </div>
      ),
    },
    {
      id: "status",
      enableSorting: false,
      header: () => <span>{t("table.status")}</span>,
      cell: ({ row }) => {
        const published = row.original.published;
        return (
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black border",
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
        <DateCell dateStr={row.original.createdAt} locale={locale} />
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">{t("table.actions")}</span>,
      cell: ({ row }) => (
        <PostActionsCell post={row.original} t={t} onEdit={onEdit} />
      ),
    },
  ];
};

function PostActionsCell({
  post,
  t,
  onEdit,
}: {
  post: Post;
  t: (key: string) => string;
  onEdit: (post: Post) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const isPublished = post.published;

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost({
    onSuccessCallback: () => setDeleteOpen(false),
  });

  const { mutate: togglePublish, isPending: isToggling } = useTogglePostPublish(
    {
      onSuccessCallback: () => setPublishOpen(false),
    },
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl p-1.5 z-50"
        >
          <DropdownMenuItem
            onClick={() => onEdit(post)}
            className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
          >
            <Edit3 className="h-4 w-4 text-primary" />
            <span>{t("actions.edit")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setPublishOpen(true)}
            className={cn(
              "cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold",
              isPublished
                ? "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10"
                : "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10",
            )}
          >
            {isPublished ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>
              {isPublished ? t("actions.unpublish") : t("actions.publish")}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

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
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        variant="destructive"
        icon={Trash2}
        title={t("confirmDelete.title")}
        confirmLabel={t("confirmDelete.confirm")}
        cancelLabel={t("confirmDelete.cancel")}
        isPending={isDeleting}
        onConfirm={() => deletePost(post.id)}
        description={
          <>
            {t("confirmDelete.description")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {post.title}
            </span>
          </>
        }
      />

      <AdminConfirmDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        variant={isPublished ? "warning" : "success"}
        icon={isPublished ? EyeOff : Eye}
        title={
          isPublished
            ? t("confirmPublish.unpublishTitle")
            : t("confirmPublish.publishTitle")
        }
        confirmLabel={
          isPublished
            ? t("confirmPublish.confirmUnpublish")
            : t("confirmPublish.confirmPublish")
        }
        cancelLabel={t("confirmPublish.cancel")}
        isPending={isToggling}
        onConfirm={() =>
          togglePublish({ id: post.id, published: !isPublished })
        }
        description={
          <>
            {isPublished
              ? t("confirmPublish.unpublishDescription")
              : t("confirmPublish.publishDescription")}
            <span className="block mt-2 p-2 rounded-lg bg-muted text-foreground font-bold">
              {post.title}
            </span>
          </>
        }
      />
    </>
  );
}
