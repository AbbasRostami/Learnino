import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { ThemeProvider } from "@/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import {
  getAlternates,
  getDefaultOpenGraph,
  getDefaultTwitter,
  PUBLIC_ROBOTS,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

const danaFont = localFont({
  src: "./../../../public/fonts/Dana.ttf",
  variable: "--font-dana",
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

  return {
    metadataBase: new URL(SEO_CONFIG.baseUrl),

    title: {
      default: `${SEO_CONFIG.siteName[locale]} | ${SEO_CONFIG.tagline[locale]}`,
      template: `%s | ${SEO_CONFIG.siteName[locale]}`,
    },

    description: SEO_CONFIG.description[locale],
    keywords: [...SEO_CONFIG.keywords[locale]],

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

    alternates: getAlternates("", locale),

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

    manifest: `/${locale}/manifest.webmanifest`,
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = (locale === "fa" ? "rtl" : "ltr") as "rtl" | "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={danaFont.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URL!} />
      </head>
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
