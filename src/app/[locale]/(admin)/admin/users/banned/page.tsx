import { AdminBannedUsersClient } from "@/components/admin/users/banned/AdminBannedUsersClient";
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
    namespace: "admin.users.banned",
  });

  return {
    title: t("pageTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function AdminBannedUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminBannedUsersClient />;
}
