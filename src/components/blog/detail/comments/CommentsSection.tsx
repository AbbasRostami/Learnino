"use client";

import { CommentsListSkeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/authStore";
import { Link } from "@/i18n/routing";
import { useCreateComment, usePostComments } from "@/services";
import { MessageCircle } from "lucide-react";
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
    onSuccessCallback: () => {
      setReplyToId(null);
    },
  });

  const comments = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const hasMore = pagination
    ? page < Math.ceil(pagination.total / pagination.limit)
    : false;

  const handleSubmit = (content: string, parentId?: string) => {
    createComment({
      content,
      postId,
      parentId,
    });
  };

  return (
    <section aria-labelledby="comments-title">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="comments-title" className="text-xl font-bold text-foreground">
          {t("comments")} {pagination?.total ? `(${pagination.total})` : ""}
        </h2>
      </div>

      {isAuthenticated ? (
        <div className="mb-8">
          <CommentForm
            onSubmit={(content) => handleSubmit(content)}
            isSubmitting={isSubmitting}
            placeholder={t("writeComment")}
            submitLabel={t("submitComment")}
          />
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-2xl border border-dashed border-border/60 bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {t("loginToComment")}
          </p>
          <Link
            href="/login"
            className="text-sm font-bold text-primary hover:underline"
          >
            ورود به حساب
          </Link>
        </div>
      )}

      {isLoading ? (
        <CommentsListSkeleton count={3} />
      ) : comments?.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t("noComments")}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
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
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full cursor-pointer"
          >
            {t("loadMoreComments")}
          </Button>
        </div>
      )}
    </section>
  );
}
