// 📂 src/app/[locale]/manifest.ts
import { SEO_CONFIG, type Locale } from "@/lib/seo";
import type { MetadataRoute } from "next";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function manifest(
  props: Props,
): Promise<MetadataRoute.Manifest> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    name: isFa ? "لرنینو | یادگیری بدون مرز" : "Learnino | Borderless Learning",

    short_name: isFa ? "لرنینو" : "Learnino",

    description: SEO_CONFIG.description[locale],

    start_url: `/${locale}`,

    display: "standalone",
    orientation: "portrait",
    theme_color: "#4f46e5",
    background_color: "#0B1120",

    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
