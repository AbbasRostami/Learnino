import { AdminTableSkeleton } from "@/components/admin/shared/AdminTableSkeleton";
import { AdminTeachersClient } from "@/components/admin/teachers/list/AdminTeachersClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.teachers" });

  return {
    title: t("pageTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function AdminTeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={7} rowCount={8} />}>
      <AdminTeachersClient />
    </Suspense>
  );
}
