import { CoursesPageClient } from "@/components/courses/list";
import { CoursesGridSkeleton } from "@/components/skeleton";
import { getAlternates, SEO_CONFIG, type Locale } from "@/lib/seo";
import { getCoursesServer } from "@/services/course/courses";
import type { CourseLevel, CourseSortBy } from "@/types";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

interface CoursesSearchParams {
  page?: string;
  search?: string;
  categories?: string | string[];
  level?: CourseLevel;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: CourseSortBy;
  order?: "asc" | "desc";
}

interface ListSectionProps {
  locale: Locale;
  searchParamsPromise: Promise<CoursesSearchParams>;
}

async function CoursesListSection({
  locale,
  searchParamsPromise,
}: ListSectionProps) {
  const sp = await searchParamsPromise;

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
    order: sp.order || "desc",
  });

  return <CoursesPageClient initialData={initialData?.data} />;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<CoursesSearchParams>;
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
    ? "صفحه کامل دوره‌های تخصصی برنامه‌ نویسی لرنینو. React, Next.js, JavaScript, Python و بیشتر."
    : "Complete page of specialized programming courses. React, Next.js, JavaScript, Python and more.";

  return {
    title,
    description,
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
  searchParams: Promise<CoursesSearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Suspense fallback={<CoursesGridSkeleton count={8} />}>
        <CoursesListSection
          locale={locale}
          searchParamsPromise={searchParams}
        />
      </Suspense>
    </main>
  );
}
