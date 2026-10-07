import { BreadcrumbJsonLd } from "@/components/seo";
import { TeacherProfileClient } from "@/components/teachers/TeacherProfileClient";
import {
  cleanMetaDescription,
  getAlternates,
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

function TeacherDetailFallback() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-40 w-40 rounded-3xl bg-muted/60 mb-6" />
      <div className="h-8 w-64 rounded-xl bg-muted/60 mb-4" />
      <div className="h-4 w-full max-w-xl rounded-md bg-muted/40" />
    </div>
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
      robots: { index: false, follow: false },
    };
  }

  const description = cleanMetaDescription(teacher.bio || "");
  const isFa = locale === "fa";

  const title = isFa
    ? `${teacher.name} - مدرس`
    : `${teacher.name} - Instructor`;

  return {
    title,
    description,
    openGraph: {
      type: "profile",
      title,
      description,
      url: `/${locale}/teachers/${slug}`,
      images: [
        {
          url: teacher.avatar || "/logo/Main-Logo.png",
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
      images: teacher.avatar ? [teacher.avatar] : [],
    },
    alternates: getAlternates(`/teachers/${slug}`, locale),
  };
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<TeacherDetailFallback />}>
        <TeacherDetailSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
