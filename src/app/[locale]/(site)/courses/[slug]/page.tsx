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
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const course = await getCourseBySlugServer(locale, slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="flex-1">
      <CourseJsonLd course={course} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `/${locale}` },
          { name: tNav("courses"), url: `/${locale}/courses` },
          { name: course?.title },
        ]}
      />

      <CourseDetailClient slug={slug} initialCourse={course} />
    </main>
  );
}
