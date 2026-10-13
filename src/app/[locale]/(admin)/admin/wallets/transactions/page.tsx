import { AdminTableSkeleton } from "@/components/admin/shared";
import { AdminTransactionsClient } from "@/components/admin/wallets/transactions/AdminTransactionsClient";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "admin.wallets.transactions",
  });

  return {
    title: t("pageTitle"),
  };
}

export default async function AdminTransactionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={8} rowCount={8} />}>
      <AdminTransactionsClient />
    </Suspense>
  );
}
