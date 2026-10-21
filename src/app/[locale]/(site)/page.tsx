import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo";
import { AboutSection } from "@/components/site/about/AboutSection";
import { CategoriesSection } from "@/components/site/categories/CategoriesSection";
import { FeaturedCoursesSection } from "@/components/site/courses/FeaturedCoursesSection";
import { BottomCta } from "@/components/site/cta/BottomCta";
import { FreeCoursesSection } from "@/components/site/free-courses/FreeCoursesSection";
import { HeroSection } from "@/components/site/hero/HeroSection";
import { LearningPathsSection } from "@/components/site/learning-paths/LearningPathsSection";
import { LatestPostsSection } from "@/components/site/posts/LatestPostsSection";
import { TeachersSection } from "@/components/site/teachers/TeachersSection";
import { TestimonialsSection } from "@/components/site/testimonials/TestimonialsSection";
import {
  CategoriesSkeleton,
  CoursesGridSkeleton,
  PostsGridSkeleton,
  TeachersGridSkeleton,
} from "@/components/skeleton";
import { Suspense } from "react";

import {
  getAlternates,
  getDefaultOpenGraph,
  getDefaultTwitter,
  getFullUrl,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa
    ? `${SEO_CONFIG.siteName.fa} | ${SEO_CONFIG.tagline.fa}`
    : `${SEO_CONFIG.siteName.en} | ${SEO_CONFIG.tagline.en}`;

  return {
    title: { absolute: title },
    description: SEO_CONFIG.description[locale],
    alternates: getAlternates("/", locale),
    openGraph: getDefaultOpenGraph(locale, {
      title,
      url: getFullUrl("", locale),
    }),
    twitter: getDefaultTwitter(locale, {
      title,
    }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <WebSiteJsonLd locale={locale} />

      <main className="flex flex-col">
        <HeroSection />

        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesSection />
        </Suspense>

        <AboutSection />

        <Suspense fallback={<CoursesGridSkeleton count={3} />}>
          <FeaturedCoursesSection />
        </Suspense>

        <Suspense fallback={<CoursesGridSkeleton count={4} />}>
          <FreeCoursesSection />
        </Suspense>

        <Suspense fallback={<TeachersGridSkeleton showHeader count={4} />}>
          <TeachersSection />
        </Suspense>

        <LearningPathsSection />

        <Suspense fallback={<PostsGridSkeleton showHeader count={3} />}>
          <LatestPostsSection />
        </Suspense>

        <TestimonialsSection />

        <BottomCta />
      </main>
    </>
  );
}
