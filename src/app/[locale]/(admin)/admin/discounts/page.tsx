import { AdminDiscountsClient } from "@/components/admin/discounts/list/AdminDiscountsClient";
import { AdminTableSkeleton } from "@/components/admin/shared";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.discounts" });

  return {
    title: t("pageTitle"),
  };
}

export default async function AdminDiscountsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={8} rowCount={8} />}>
      <AdminDiscountsClient />
    </Suspense>
  );
}
