import { PaymentFailedClient } from "@/components/payment/PaymentFailedClient";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "پرداخت ناموفق | لرنینو",
};

interface SearchParamsProps {
  status?: string;
  reason?: string;
  authority?: string;
}

interface FailedContentProps {
  searchParamsPromise: Promise<SearchParamsProps>;
}

async function FailedContent({ searchParamsPromise }: FailedContentProps) {
  const sp = await searchParamsPromise;

  return <PaymentFailedClient reason={sp.reason} authority={sp.authority} />;
}

function PaymentFailedFallback() {
  return (
    <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[70vh] animate-pulse">
      <div className="h-20 w-20 rounded-full bg-rose-500/10 mb-6" />
      <div className="h-8 w-64 rounded-xl bg-muted/60 mb-4" />
      <div className="h-4 w-96 rounded-md bg-muted/40 mb-8" />
    </div>
  );
}

export default async function PaymentFailedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParamsProps>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<PaymentFailedFallback />}>
      <FailedContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}