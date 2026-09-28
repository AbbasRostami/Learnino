import { AdminLayoutClient } from "@/components/admin/layout/AdminLayoutClient";
import { AdminSidebarProvider } from "@/store/AdminSidebarContext";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });

  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("subtitle"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AdminSidebarProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AdminSidebarProvider>
  );
}
