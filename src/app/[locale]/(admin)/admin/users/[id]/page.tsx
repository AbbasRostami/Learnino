import { AdminTableSkeleton } from "@/components/admin/shared";
import { AdminUserDetailClient } from "@/components/admin/users/detail/AdminUserDetailClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={8} rowCount={8} />}>
      <AdminUserDetailClient userId={id} />
    </Suspense>
  );
}
