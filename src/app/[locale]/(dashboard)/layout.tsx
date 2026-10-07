import { DashboardLayoutClient } from "@/components/dashboard/DashboardLayoutClient";
import { Locale, PRIVATE_ROBOTS } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  return {
    title: isFa ? "پنل کاربری" : "Dashboard",
    robots: PRIVATE_ROBOTS,
  };
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background opacity-50" />}
    >
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </Suspense>
  );
}
