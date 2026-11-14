import { BreadcrumbJsonLd } from "@/components/seo";
import { TeacherProfileSkeleton } from "@/components/skeleton";
import { TeacherProfileClient } from "@/components/teachers/TeacherProfileClient";
import {
  cleanMetaDescription,
  getDynamicAlternates,
  getFullUrl,
  PRIVATE_ROBOTS,
  safeEncodeSlug,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import { getTeacherBySlugServer } from "@/services/teacher/teachers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface TeacherSectionProps {
  paramsPromise: Promise<{ locale: Locale; slug: string }>;
}

async function TeacherDetailSection({ paramsPromise }: TeacherSectionProps) {
  const { locale, slug } = await paramsPromise;

  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const teacher = await getTeacherBySlugServer(locale, slug);

  if (!teacher || !teacher.show) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `/${locale}` },
          { name: teacher.name },
        ]}
      />
      <TeacherProfileClient slug={slug} initialTeacher={teacher} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const teacher = await getTeacherBySlugServer(locale, slug);

  if (!teacher || !teacher.show) {
    return {
      title: locale === "fa" ? "مدرس یافت نشد" : "Teacher Not Found",
      robots: PRIVATE_ROBOTS,
    };
  }

  const description = cleanMetaDescription(teacher.bio || "");
  const isFa = locale === "fa";
  const title = isFa
    ? `${teacher.name} - مدرس`
    : `${teacher.name} - Instructor`;

  const encodedSlug = safeEncodeSlug(teacher.slug);
  const fullPageUrl = getFullUrl(`/teachers/${encodedSlug}`, locale);

  const rawAvatar = teacher.avatar || SEO_CONFIG.defaultImages.og;
  const ogImage = rawAvatar.startsWith("http")
    ? rawAvatar
    : getFullUrl(rawAvatar);

  return {
    title,
    description,
    openGraph: {
      type: "profile",
      title,
      description,
      url: fullPageUrl,
      images: [
        {
          url: ogImage,
          width: teacher.avatar ? 400 : 1200,
          height: teacher.avatar ? 400 : 630,
          alt: teacher.name,
        },
      ],
      locale: isFa ? "fa_IR" : "en_US",
      siteName: SEO_CONFIG.siteName[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: getDynamicAlternates({
      basePath: "teachers",
      currentLocale: locale,
      slugFa: teacher.slug,
      slugEn: teacher.slug,
    }),
  };
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<TeacherProfileSkeleton />}>
        <TeacherDetailSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
