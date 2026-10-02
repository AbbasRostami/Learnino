import { BlogPageClient } from "@/components/blog/list";
import { PostsGridSkeleton } from "@/components/skeleton";
import { getAlternates, SEO_CONFIG, type Locale } from "@/lib/seo";
import { getLatestPostsServer } from "@/services/post/posts";
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

  const baseTitle = isFa ? "بلاگ آموزشی" : "Educational Blog";

  const title =
    currentPage > 1
      ? isFa
        ? `${baseTitle} - صفحه ${currentPage}`
        : `${baseTitle} - Page ${currentPage}`
      : baseTitle;

  const description = isFa
    ? "آخرین مقالات آموزشی لرنینو در زمینه برنامه‌نویسی، توسعه وب و فناوری."
    : "Latest educational articles on programming, web development, and technology.";

  return {
    title,
    description,
    keywords: isFa
      ? ["بلاگ برنامه‌نویسی", "مقالات آموزشی", "آموزش کدنویسی", "لرنینو"]
      : [
          "programming blog",
          "educational articles",
          "coding tutorials",
          "Learnino",
        ],
    openGraph: {
      title,
      description,
      url: `/${locale}/blog`,
      type: "website",
      siteName: SEO_CONFIG.siteName[locale],
      locale: isFa ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: getAlternates("/blog", locale),

    robots:
      currentPage > 1
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const initialPosts = await getLatestPostsServer(locale, 9);

  return (
    <Suspense fallback={<PostsGridSkeleton count={6} />}>
      <BlogPageClient initialPosts={initialPosts} locale={locale} />
    </Suspense>
  );
}
