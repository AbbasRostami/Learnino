"use client";

import { AdminPageHeader } from "@/components/admin/shared";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminPostDetails } from "@/services";
import { ArrowLeft, Edit3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { PostForm } from "../form/PostForm";

interface AdminEditPostClientProps {
  slug: string;
}

export function AdminEditPostClient({ slug }: AdminEditPostClientProps) {
  const t = useTranslations("admin.posts.form");
  const router = useRouter();

  const { data, isLoading } = useAdminPostDetails(slug);
  const post = data?.data?.post;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <AdminPageHeader
        title={t("editTitle")}
        subtitle={t("editDescription")}
        icon={Edit3}
        actions={
          <Link
            href="/admin/posts"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-md h-9 gap-2 cursor-pointer shadow-xs",
            )}
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t("cancel")}</span>
          </Link>
        }
      />

      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xs">
        {isLoading && !post ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        ) : !post ? (
          <div className="text-center py-10 text-xs font-bold text-muted-foreground">
            {t("postNotFound")}
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
