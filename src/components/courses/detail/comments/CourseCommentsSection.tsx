"use client";

import { CommentForm } from "@/components/blog/detail/comments/CommentForm";
import { CommentsListSkeleton } from "@/components/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCourseComments, useCreateComment } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, MessageSquare, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CourseCommentCard } from "./CourseCommentCard";

interface CourseCommentsSectionProps {
  courseSlug: string;
  courseId: string;
}

export function CourseCommentsSection({
  courseSlug,
  courseId,
}: CourseCommentsSectionProps) {
  const t = useTranslations("blog");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [replyToId, setReplyToId] = useState<string | null>(null);

  const { data, isLoading } = useCourseComments(courseSlug, {
    page,
    limit: 10,
  });

  const { mutate: createComment, isPending: isSubmitting } = useCreateComment({
    onSuccessCallback: () => {
      setReplyToId(null);
      queryClient.invalidateQueries({
        queryKey: ["comments", "course", courseSlug],
      });
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
      courseId,
      ...(parentId && { parentId }),
    });
  };

  return (
    <section
      aria-labelledby="course-comments-title"
      className="p-6 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm dark:bg-card/80"
    >
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquare className="h-4.5 w-4.5" aria-hidden="true" />
          </div>
          <h2
            id="course-comments-title"
            className="text-lg font-black text-foreground"
          >
            {t("comments")}
            {pagination?.total ? ` (${pagination.total})` : ""}
          </h2>
        </div>
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
        <div className="mb-8 p-6 sm:p-8 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-brand-accent/5 to-transparent text-center flex flex-col items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <p className="text-base font-bold text-foreground">
              {t("loginToComment")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              برای ثبت دیدگاه، پرسش درباره دوره یا پاسخ به نظر دیگران وارد حساب
              کاربری خود شوید.
            </p>
          </div>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "default" }),
              "mt-2 rounded-full px-6 font-bold cursor-pointer bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:opacity-90 gap-2",
            )}
          >
            <LogIn className="h-4 w-4" />
            <span>ورود به حساب کاربری</span>
          </Link>
        </div>
      )}

      {isLoading ? (
        <CommentsListSkeleton count={3} />
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground font-semibold">
            {t("noComments")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {comments?.map((comment) => (
            <CourseCommentCard
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
        <div className="mt-8 flex justify-center border-t border-border/40 pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full cursor-pointer px-6 hover:bg-muted font-bold text-xs"
          >
            {t("loadMoreComments")}
          </Button>
        </div>
      )}
    </section>
  );
}
