import {
  LearningPathsCTA,
  LearningPathsFeatures,
  LearningPathsHero,
  LearningPathsHowItWorks,
  LearningPathsList,
} from "@/components/learning-paths";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "learningPathsPage.meta",
  });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/learning-paths`,
      languages: {
        fa: "/fa/learning-paths",
        en: "/en/learning-paths",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
  };
}

export default async function LearningPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
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
