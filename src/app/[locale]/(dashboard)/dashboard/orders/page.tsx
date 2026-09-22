import { OrdersListClient } from "@/components/dashboard/orders/OrdersListClient";
import { setRequestLocale } from "next-intl/server";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OrdersListClient />;
}