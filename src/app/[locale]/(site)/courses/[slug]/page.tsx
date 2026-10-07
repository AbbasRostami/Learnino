import { CourseDetailClient } from "@/components/courses/detail";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo";
import {
  cleanMetaDescription,
  getAlternates,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import { getCourseBySlugServer } from "@/services/course/courses";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface CourseSectionProps {
  paramsPromise: Promise<{ locale: Locale; slug: string }>;
}

async function CourseDetailSection({ paramsPromise }: CourseSectionProps) {
  const { locale, slug } = await paramsPromise;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const course = await getCourseBySlugServer(locale, slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <CourseJsonLd course={course} locale={locale} />

      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `/${locale}` },
          { name: tNav("courses"), url: `/${locale}/courses` },
          { name: course.title },
        ]}
      />

      <CourseDetailClient slug={slug} initialCourse={course} />
    </>
  );
}

function CourseDetailFallback() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      <div className="h-6 w-32 rounded-full bg-muted/60 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        <div>
          <div className="h-10 w-3/4 rounded-2xl bg-muted/60 mb-4" />
          <div className="h-4 w-full max-w-2xl rounded-md bg-muted/40 mb-8" />
          <div className="aspect-video w-full rounded-3xl bg-muted/60 mb-10" />
        </div>
        <div className="h-96 rounded-3xl bg-muted/60" />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourseBySlugServer(locale, slug);

  if (!course) {
    return {
      title: locale === "fa" ? "دوره یافت نشد" : "Course Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = cleanMetaDescription(course?.description || "");
  const isFa = locale === "fa";
  const ogImage = course?.imageUrl || "/logo/Main-Logo.png";

  return {
    title: course?.title,
    description,

    openGraph: {
      type: "website",
      title: course?.title,
      description,
      url: `/${locale}/courses/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: course?.title,
        },
      ],
      locale: isFa ? "fa_IR" : "en_US",
      siteName: SEO_CONFIG.siteName[locale],
    },

    twitter: {
      card: "summary_large_image",
      title: course?.title,
      description,
      images: [ogImage],
    },

    alternates: getAlternates(`/courses/${slug}`, locale),
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<CourseDetailFallback />}>
        <CourseDetailSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
