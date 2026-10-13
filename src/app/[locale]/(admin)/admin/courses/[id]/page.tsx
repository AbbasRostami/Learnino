import { AdminEditCourseClient } from "@/components/admin/courses/edit/AdminEditCourseClient";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.courses.form" });

  return {
    title: t("editTitle"),
  };
}

async function AdminEditCourseSection({
  paramsPromise,
}: {
  paramsPromise: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await paramsPromise;
  setRequestLocale(locale);

  return <AdminEditCourseClient slug={id} />;
}

export default function AdminEditCoursePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full p-6">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      }
    >
      <AdminEditCourseSection paramsPromise={params} />
    </Suspense>
  );
}
