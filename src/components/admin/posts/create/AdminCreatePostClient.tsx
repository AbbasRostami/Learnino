"use client";

import { AdminPageHeader } from "@/components/admin/shared";
import { buttonVariants } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowLeft, FilePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { PostForm } from "../form/PostForm";

export function AdminCreatePostClient() {
  const t = useTranslations("admin.posts.form");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <AdminPageHeader
          title={t("createTitle")}
          subtitle={t("createDescription")}
          icon={FilePlus}
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
          <PostForm
            onSuccess={() => router.push("/admin/posts")}
            onCancel={() => router.push("/admin/posts")}
          />
        </div>
    </div>
  );
}
