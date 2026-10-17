import { MyCommentsClient } from "@/components/dashboard/comments/MyCommentsClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard.menu" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return {
    title: `${t("comments")} | ${tCommon("appName")}`,
  };
}

export default async function MyCommentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MyCommentsClient />;
}
