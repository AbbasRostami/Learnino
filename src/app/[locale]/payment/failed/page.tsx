import { PaymentFailedClient } from "@/components/payment/PaymentFailedClient";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "پرداخت ناموفق | لرنینو",
};

interface PaymentFailedPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    status?: string;
    reason?: string;
    authority?: string;
  }>;
}

export default async function PaymentFailedPage({
  params,
  searchParams,
}: PaymentFailedPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  return <PaymentFailedClient reason={sp.reason} authority={sp.authority} />;
}
