import { PaymentSuccessClient } from "@/components/payment/PaymentSuccessClient";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "پرداخت موفق | لرنینو",
};

interface SearchParamsProps {
  status?: string;
  refId?: string;
  amount?: string;
  newBalance?: string;
  transactionId?: string;
  orderId?: string;
}

interface SuccessContentProps {
  searchParamsPromise: Promise<SearchParamsProps>;
}

async function SuccessContent({ searchParamsPromise }: SuccessContentProps) {
  const sp = await searchParamsPromise;

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

function PaymentSuccessFallback() {
  return (
    <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[70vh] animate-pulse">
      <div className="h-20 w-20 rounded-full bg-emerald-500/10 mb-6" />
      <div className="h-8 w-64 rounded-xl bg-muted/60 mb-4" />
      <div className="h-4 w-96 rounded-md bg-muted/40 mb-8" />
    </div>
  );
}

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParamsProps>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <SuccessContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}
