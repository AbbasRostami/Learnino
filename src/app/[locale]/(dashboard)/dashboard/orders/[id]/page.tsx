import { OrderDetailClient } from "@/components/dashboard/orders/OrderDetailClient";
import { setRequestLocale } from "next-intl/server";

export const instant = false;

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <OrderDetailClient orderId={id} />;
}
