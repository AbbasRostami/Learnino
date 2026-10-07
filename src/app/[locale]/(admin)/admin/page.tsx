import { AdminOverviewClient } from "@/components/admin/overview/AdminOverviewClient";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <AdminOverviewClient />
    </Suspense>
  );
}
