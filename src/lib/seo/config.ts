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
