import {
  LearningPathsCTA,
  LearningPathsFeatures,
  LearningPathsHero,
  LearningPathsHowItWorks,
  LearningPathsList,
} from "@/components/learning-paths";
import { getAlternates, SEO_CONFIG, type Locale } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa ? "مسیرهای یادگیری" : "Learning Paths";
  const description = isFa
    ? "مسیرهای یادگیری منظم و قدم به قدم برای تبدیل شدن به توسعه‌دهنده حرفه‌ای. از صفر تا بازار کار."
    : "Structured step-by-step learning paths to become a professional developer. From zero to career-ready.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/learning-paths`,
      type: "website",
      siteName: SEO_CONFIG.siteName[locale],
      locale: isFa ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: getAlternates("/learning-paths", locale),
  };
}

export default async function LearningPathsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <LearningPathsHero />
      <LearningPathsFeatures />
      <LearningPathsList />
      <LearningPathsHowItWorks />
      <LearningPathsCTA />
    </main>
  );
}
