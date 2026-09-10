import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { Toaster } from "@/components/ui/sonner"; // 👈 اضافه شود
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={locale === "fa" ? "font-vazir" : "font-inter"}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster richColors position="top-right" /> {/* 👈 اضافه شود */}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
