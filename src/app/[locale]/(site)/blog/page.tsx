import { BlogPageClient } from "@/components/blog/list";
import { PostsGridSkeleton } from "@/components/skeleton";
import { getAlternates, SEO_CONFIG, type Locale } from "@/lib/seo";
import { getLatestPostsServer } from "@/services/post/posts";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

interface BlogSectionProps {
  paramsPromise: Promise<{ locale: Locale }>;
}

async function BlogListSection({ paramsPromise }: BlogSectionProps) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);

  const initialPosts = await getLatestPostsServer(locale, 9);

  return <BlogPageClient initialPosts={initialPosts} locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa ? "بلاگ آموزشی" : "Educational Blog";
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
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<PostsGridSkeleton count={9} showHeader={false} />}>
        <BlogListSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
