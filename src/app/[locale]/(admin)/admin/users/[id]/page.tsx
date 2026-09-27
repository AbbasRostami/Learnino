import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { AdminUserDetailClient } from "@/components/admin/users/detail/AdminUserDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.users.detail" });

  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <AdminUserDetailClient userId={id} />;
}