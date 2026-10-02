import { SEO_CONFIG, serializeJsonLd, type Locale } from "@/lib/seo";
import Script from "next/script";

interface WebSiteJsonLdProps {
  locale: Locale;
}

export function WebSiteJsonLd({ locale }: WebSiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.baseUrl}/#website`,
    name: SEO_CONFIG.siteName[locale],
    url: SEO_CONFIG.baseUrl,
    description: SEO_CONFIG.description[locale],
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    publisher: {
      "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.baseUrl}/${locale}/courses?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
