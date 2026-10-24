import { AdminEditPostClient } from "@/components/admin/posts/edit/AdminEditPostClient";
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
  const t = await getTranslations({ locale, namespace: "admin.posts.form" });

  return {
    title: t("editTitle"),
  };
}

interface AdminEditPostSectionProps {
  paramsPromise: Promise<{ locale: string; slug: string }>;
}

async function AdminEditPostSection({
  paramsPromise,
}: AdminEditPostSectionProps) {
  const { locale, slug } = await paramsPromise;
  setRequestLocale(locale);

  return <AdminEditPostClient slug={slug} />;
}

export default function AdminEditPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
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
      <AdminEditPostSection paramsPromise={params} />
    </Suspense>
  );
}
