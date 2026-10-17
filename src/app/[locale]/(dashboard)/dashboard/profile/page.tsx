import { ProfileClient } from "@/components/dashboard/profile/ProfileClient";
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
    title: `${t("profile")} | ${tCommon("appName")}`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfileClient />;
}
