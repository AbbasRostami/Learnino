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

async function AdminOrderDetailSection({
  paramsPromise,
}: {
  paramsPromise: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await paramsPromise;
  setRequestLocale(locale);

  return <AdminOrderDetailClient orderId={id} />;
}

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  return (
    <Suspense fallback={<AdminTableSkeleton columnCount={8} rowCount={8} />}>
      <AdminOrderDetailSection paramsPromise={params} />
    </Suspense>
  );
}
