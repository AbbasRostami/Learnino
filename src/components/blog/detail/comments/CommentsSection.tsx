"use client";

import { CommentsListSkeleton } from "@/components/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCreateComment, usePostComments } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { LogIn, MessageCircle, MessageSquareOff, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";

interface CommentsSectionProps {
  postSlug: string;
  postId: string;
}

export function CommentsSection({ postSlug, postId }: CommentsSectionProps) {
  const t = useTranslations("blog");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [page, setPage] = useState(1);
  const [replyToId, setReplyToId] = useState<string | null>(null);

  const { data, isLoading } = usePostComments(postSlug, {
    page,
    limit: 10,
  });

  const { mutate: createComment, isPending: isSubmitting } = useCreateComment({
    onSuccessCallback: () => setReplyToId(null),
  });

  const comments = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const hasMore = pagination
    ? page < Math.ceil(pagination?.total / pagination?.limit)
    : false;

  const handleSubmit = (content: string, parentId?: string) => {
    createComment({ content, postId, parentId });
  };

  return (
    <section aria-labelledby="comments-title">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 id="comments-title" className="text-2xl font-black text-foreground">
          {t("comments")}{" "}
          {pagination?.total ? (
            <span className="text-muted-foreground text-lg ml-1">
              ({pagination.total})
            </span>
          ) : (
            ""
          )}
        </h2>
      </div>

      {isAuthenticated ? (
        <div className="mb-10 p-5 rounded-3xl bg-card border border-border/50 shadow-sm">
          <CommentForm
            onSubmit={(content) => handleSubmit(content)}
            isSubmitting={isSubmitting}
            placeholder={t("writeComment")}
            submitLabel={t("submitComment")}
          />
        </div>
      ) : (
        <div className="mb-10 p-8 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-brand-accent/5 to-transparent text-center flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Sparkles className="h-7 w-7" />
          </div>
          <div className="space-y-1.5">
            <p className="text-lg font-black text-foreground">
              {t("loginToComment")}
            </p>
            <p className="text-sm text-muted-foreground">
              برای ثبت دیدگاه و شرکت در بحث، لطفاً وارد حساب کاربری خود شوید.
            </p>
          </div>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-2 rounded-full px-8 font-bold gap-2 shadow-lg shadow-primary/20",
            )}
          >
            <LogIn className="h-4 w-4" />
            <span>ورود به حساب کاربری</span>
          </Link>
        </div>
      )}

      {isLoading ? (
        <CommentsListSkeleton count={3} />
      ) : comments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 bg-muted/20 rounded-3xl border border-dashed border-border/60">
          <MessageSquareOff className="h-12 w-12 text-muted-foreground/30" />
          <p className="text-base font-bold text-muted-foreground">
            {t("noComments")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentCard
              key={comment?.id}
              comment={comment}
              replyToId={replyToId}
              onReply={setReplyToId}
              onSubmitReply={(content, parentId) =>
                handleSubmit(content, parentId)
              }
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full cursor-pointer px-8 shadow-sm font-bold"
          >
            {t("loadMoreComments")}
          </Button>
        </div>
      )}
    </section>
  );
}
