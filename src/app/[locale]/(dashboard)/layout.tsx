import { DashboardLayoutClient } from "@/components/dashboard/DashboardLayoutClient";
import type { Locale } from "@/lib/seo";
import { PRIVATE_ROBOTS } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
