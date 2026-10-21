import type { Metadata } from "next";
import { Locale, SEO_CONFIG } from "./config";

export function cleanMetaDescription(html: string, maxLength = 155): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function getFullUrl(path: string, locale?: Locale): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;
  const localePrefix = locale ? `/${locale}` : "";
  return `${SEO_CONFIG.baseUrl}${localePrefix}${cleanPath}`;
}

export function getAlternates(path: string, currentLocale: Locale) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  return {
    canonical: `${SEO_CONFIG.baseUrl}/${currentLocale}${cleanPath}`,
    languages: {
      fa: `${SEO_CONFIG.baseUrl}/fa${cleanPath}`,
      en: `${SEO_CONFIG.baseUrl}/en${cleanPath}`,
      "x-default": `${SEO_CONFIG.baseUrl}/fa${cleanPath}`,
    },
  };
}

export function getDefaultOpenGraph(
  locale: Locale,
  overrides?: Partial<Metadata["openGraph"]>,
): Metadata["openGraph"] {
  const defaultOgImage = getFullUrl(SEO_CONFIG.defaultImages.og);

  return {
    type: "website",
    locale: locale === "fa" ? "fa_IR" : "en_US",
    siteName: SEO_CONFIG.siteName[locale],
    title: `${SEO_CONFIG.siteName[locale]} | ${SEO_CONFIG.tagline[locale]}`,
    description: SEO_CONFIG.description[locale],
    url: getFullUrl("", locale),
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName[locale],
      },
    ],
    ...overrides,
  };
}

export function getDefaultTwitter(
  locale: Locale,
  overrides?: Partial<Metadata["twitter"]>,
): Metadata["twitter"] {
  const defaultOgImage = getFullUrl(SEO_CONFIG.defaultImages.og);

  return {
    card: "summary_large_image",
    title: `${SEO_CONFIG.siteName[locale]} | ${SEO_CONFIG.tagline[locale]}`,
    description: SEO_CONFIG.description[locale],
    images: [defaultOgImage],
    creator: SEO_CONFIG.social.twitter,
    site: SEO_CONFIG.social.twitter,
    ...overrides,
  };
}

export const PUBLIC_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const PRIVATE_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
};

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
