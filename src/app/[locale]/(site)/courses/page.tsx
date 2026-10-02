import { CoursesPageClient } from "@/components/courses/list";
import { CoursesGridSkeleton } from "@/components/skeleton";
import { getAlternates, SEO_CONFIG, type Locale } from "@/lib/seo";
import { getCoursesServer } from "@/services/course/courses";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const isFa = locale === "fa";

  const currentPage = sp.page ? parseInt(sp.page, 10) : 1;

  const baseTitle = isFa ? "دوره‌های آموزشی" : "All Courses";

  const title =
    currentPage > 1
      ? isFa
        ? `${baseTitle} - صفحه ${currentPage}`
        : `${baseTitle} - Page ${currentPage}`
      : baseTitle;

  const description = isFa
    ? "کاتالوگ کامل دوره‌های تخصصی برنامه‌نویسی لرنینو. React, Next.js, JavaScript, Python و بیشتر."
    : "Complete catalog of specialized programming courses. React, Next.js, JavaScript, Python and more.";

  return {
    title,
    description,
    keywords: isFa
      ? [
          "دوره آموزشی",
          "آموزش React",
          "آموزش Next.js",
          "آموزش جاوااسکریپت",
          "لرنینو",
        ]
      : [
          "online courses",
          "React tutorial",
          "Next.js course",
          "JavaScript tutorial",
          "Learnino",
        ],
    openGraph: {
      title,
      description,
      url: `/${locale}/courses`,
      type: "website",
      siteName: SEO_CONFIG.siteName[locale],
      locale: isFa ? "fa_IR" : "en_US",
    },
    alternates: getAlternates("/courses", locale),

    robots:
      currentPage > 1
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
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

  const page = sp?.page ? parseInt(sp?.page, 10) : 1;
  const categories = Array.isArray(sp?.categories)
    ? sp?.categories
    : sp?.categories
      ? [sp?.categories]
      : [];

  const initialData = await getCoursesServer(locale, {
    page,
    search: sp?.search,
    categories,
    level: sp?.level,
    minPrice: sp?.minPrice ? Number(sp?.minPrice) : undefined,
    maxPrice: sp?.maxPrice ? Number(sp?.maxPrice) : undefined,
    sortBy: sp?.sortBy || "createdAt",
    order: (sp?.order as "asc" | "desc") || "desc",
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
