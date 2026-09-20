import { CourseDetailClient } from "@/components/courses/detail";
import { getCourseBySlugServer } from "@/services/course/courses";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const course = await getCourseBySlugServer(locale, slug);

  if (!course) return { title: tCommon("appName") };

  const cleanDesc =
    course.description?.replace(/<[^>]*>/g, "").slice(0, 155) || "";

  return {
    metadataBase: new URL(baseUrl),
    title: `${course.title} | ${tCommon("appName")}`,
    description: cleanDesc,
    alternates: {
      canonical: `/${locale}/courses/${slug}`,
      languages: {
        fa: `/fa/courses/${slug}`,
        en: `/en/courses/${slug}`,
      },
    },
    openGraph: {
      title: course.title,
      description: cleanDesc,
      type: "website",
      url: `${baseUrl}/${locale}/courses/${slug}`,
      images: course.imageUrl
        ? [{ url: course.imageUrl, width: 1200, height: 630 }]
        : [],
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: cleanDesc,
      images: course.imageUrl ? [course.imageUrl] : [],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const course = await getCourseBySlugServer(locale, slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="flex-1">
      <CourseDetailClient slug={slug} initialCourse={course} />
    </main>
  );
}
