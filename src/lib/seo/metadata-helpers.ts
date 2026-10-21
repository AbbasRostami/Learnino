import type { Metadata } from "next";

const appUrl = (
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const SEO_CONFIG = {
  baseUrl: appUrl,

  siteName: {
    fa: "لرنینو",
    en: "Learnino",
  },

  tagline: {
    fa: "پلتفرم آموزش برنامه‌نویسی",
    en: "Programming Education Platform",
  },

  description: {
    fa: "لرنینو، پلتفرم تخصصی آموزش برنامه‌نویسی و توسعه نرم‌افزار. از صفر تا ورود به بازار کار با دوره‌های پروژه‌محور و اساتید مجرب.",
    en: "Learnino is a specialized platform for programming and software development education. From zero to job-ready with project-based courses.",
  },

  keywords: {
    fa: [
      "آموزش برنامه‌نویسی",
      "دوره React",
      "دوره Next.js",
      "آموزش جاوااسکریپت",
      "آموزش پایتون",
      "لرنینو",
      "دوره آنلاین",
    ],
    en: [
      "programming courses",
      "React course",
      "Next.js tutorial",
      "JavaScript",
      "Python",
      "Learnino",
      "online courses",
    ],
  },

  author: {
    name: "Abbas Rostami",
    url: "https://github.com/AbbasRostami",
  },

  publisher: "Learnino",

  social: {
    twitter: "@learnino",
    instagram: "@learnino",
    telegram: "@learnino",
  },

  defaultImages: {
    og: "/logo/Main-Logo.png",
    logo: "/logo/Main-Logo.png",
    favicon: "/favicon.ico",
  },

  locales: ["fa", "en"] as const,
  defaultLocale: "fa" as const,
} as const;

export type Locale = (typeof SEO_CONFIG.locales)[number];

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
