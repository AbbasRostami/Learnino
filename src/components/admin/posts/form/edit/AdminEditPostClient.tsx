"use client";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { usePost } from "@/services";
import { ArrowLeft, Edit3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { PostForm } from "../PostForm";

interface AdminEditPostClientProps {
  postId: string;
}

export function AdminEditPostClient({ postId }: AdminEditPostClientProps) {
  const t = useTranslations("admin.posts.form");
  const router = useRouter();

  const { data, isLoading } = usePost(postId);
  const post = data?.data?.post;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <Edit3 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("editTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {t("editDescription")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/posts"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("cancel")}</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xs">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        ) : (
          <PostForm
            post={post}
            onSuccess={() => router.push("/admin/posts")}
            onCancel={() => router.push("/admin/posts")}
          />
        )}
      </div>
    </div>
  );
}
