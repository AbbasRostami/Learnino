"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { CourseForm } from "../form/CourseForm";

export function AdminCreateCourseClient() {
  const t = useTranslations("admin.courses.form");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("createTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {t("createDescription")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/courses"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs",
          )}
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t("cancel")}</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 sm:p-8 ">
        <CourseForm
          onSuccess={() => router.push("/admin/courses")}
          onCancel={() => router.push("/admin/courses")}
        />
      </div>
    </div>
  );
}
