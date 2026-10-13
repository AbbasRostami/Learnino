import { AdminOrderDetailClient } from "@/components/admin/orders/detail/AdminOrderDetailClient";
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
  const t = await getTranslations({ locale, namespace: "admin.orders.detail" });

  return {
    title: t("title"),
  };
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={8} rowCount={8} />}>
      <AdminOrderDetailClient orderId={id} />
    </Suspense>
  );
}
