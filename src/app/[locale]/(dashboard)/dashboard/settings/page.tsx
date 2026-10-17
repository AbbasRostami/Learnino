import { SettingsClient } from "@/components/dashboard/settings/SettingsClient";
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
    title: `${t("settings")} | ${tCommon("appName")}`,
  };
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SettingsClient />;
}
