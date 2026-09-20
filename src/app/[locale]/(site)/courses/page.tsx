import { CoursesPageClient } from "@/components/courses/list";
import { CoursesGridSkeleton } from "@/components/skeleton/CoursesGridSkeleton";
import { getCoursesServer } from "@/services/course/courses";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "course" });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/courses`,
      languages: { fa: "/fa/courses", en: "/en/courses" },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
  };
}

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    categories?: string | string[];
    level?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    order?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  setRequestLocale(locale);

  const page = sp.page ? parseInt(sp.page, 10) : 1;
  const categories = Array.isArray(sp.categories)
    ? sp.categories
    : sp.categories
      ? [sp.categories]
      : [];

  const initialData = await getCoursesServer(locale, {
    page,
    search: sp.search,
    categories,
    level: sp.level,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    sortBy: sp.sortBy || "createdAt",
    order: (sp.order as "asc" | "desc") || "desc",
  });

  const suspenseKey = JSON.stringify(sp);

  return (
    <main className="flex-1">
      <Suspense key={suspenseKey} fallback={<CoursesGridSkeleton count={6} />}>
        <CoursesPageClient initialData={initialData?.data} />
      </Suspense>
    </main>
  );
}
