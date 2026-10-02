import {
  AboutCTA,
  AboutHero,
  AboutMission,
  AboutStats,
  AboutStory,
  AboutValues,
} from "@/components/about";
import type { Locale } from "@/lib/seo";
import { getAlternates, SEO_CONFIG } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  const title = isFa ? "درباره لرنینو" : "About Learnino";
  const description = isFa
    ? "داستان لرنینو، ماموریت ما، ارزش‌هایمان و تیم تخصصی که در کنار شماست."
    : "The story of Learnino, our mission, values, and the dedicated team supporting you.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/about`,
      type: "website",
      siteName: SEO_CONFIG.siteName[locale],
      locale: isFa ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: getAlternates("/about", locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutStory />
      <AboutCTA />
    </main>
  );
}
