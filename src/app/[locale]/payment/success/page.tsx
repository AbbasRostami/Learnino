import { PaymentSuccessClient } from "@/components/payment/PaymentSuccessClient";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "پرداخت موفق | لرنینو",
};

interface PaymentSuccessPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    status?: string;
    refId?: string;
    amount?: string;
    newBalance?: string;
    transactionId?: string;
    orderId?: string;
  }>;
}

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: PaymentSuccessPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  return (
    <PaymentSuccessClient
      refId={sp.refId}
      amount={sp.amount ? Number(sp.amount) : undefined}
      newBalance={sp.newBalance ? Number(sp.newBalance) : undefined}
      transactionId={sp.transactionId}
      orderId={sp.orderId}
    />
  );
}
