import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import {
  getDefaultOpenGraph,
  getDefaultTwitter,
  PUBLIC_ROBOTS,
  SEO_CONFIG,
} from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

const danaFont = localFont({
  src: "./../../../public/fonts/Dana.ttf",
  variable: "--font-dana",
  display: "swap",
});

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;

  const currentLocale: Locale = SEO_CONFIG.locales.includes(locale as Locale)
    ? (locale as Locale)
    : SEO_CONFIG.defaultLocale;

  const keywordsList = SEO_CONFIG.keywords[currentLocale];
  const baseUrl = SEO_CONFIG.baseUrl || "https://learnino.vercel.app";

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: `${SEO_CONFIG.siteName[locale]} | ${SEO_CONFIG.tagline[locale]}`,
      template: `%s | ${SEO_CONFIG.siteName[locale]}`,
    },

    description: SEO_CONFIG.description[locale],
    keywords: Array.isArray(keywordsList) ? [...keywordsList] : [],

    authors: [SEO_CONFIG.author],
    creator: SEO_CONFIG.author.name,
    publisher: SEO_CONFIG.publisher,

    icons: {
      icon: SEO_CONFIG.defaultImages.favicon,
      apple: "/apple-icon.png",
    },

    openGraph: {
      ...getDefaultOpenGraph(locale),
      url: `/${locale}`,
    },

    twitter: getDefaultTwitter(locale),

    alternates: {
      canonical: `/${locale}`,
      languages: {
        fa: "/fa",
        en: "/en",
        "x-default": "/en",
      },
    },

    robots: PUBLIC_ROBOTS,

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION!,
    },

    category: "Education",
    applicationName: SEO_CONFIG.siteName[locale],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = (locale === "fa" ? "rtl" : "ltr") as "rtl" | "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${danaFont.variable} ${interFont.variable}`}
      suppressHydrationWarning
    >
      <body className={locale === "fa" ? "font-dana" : "font-inter"}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <DirectionProvider direction={direction}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <NuqsAdapter>{children}</NuqsAdapter>
              </ThemeProvider>
              <Toaster
                richColors
                position={locale === "fa" ? "top-right" : "top-left"}
                dir={direction}
              />
            </DirectionProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
