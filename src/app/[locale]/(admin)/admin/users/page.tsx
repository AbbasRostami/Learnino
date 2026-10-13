import { AdminTableSkeleton } from "@/components/admin/shared";
import { AdminUsersClient } from "@/components/admin/users/list/AdminUsersClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.users" });

  return {
    title: t("pageTitle"),
  };
}

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={7} rowCount={8} />}>
      <AdminUsersClient />
    </Suspense>
  );
}
