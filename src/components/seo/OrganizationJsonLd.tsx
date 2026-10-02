import { SEO_CONFIG, serializeJsonLd, type Locale } from "@/lib/seo";
import Script from "next/script";

interface OrganizationJsonLdProps {
  locale: Locale;
}

export function OrganizationJsonLd({ locale }: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    name: SEO_CONFIG.siteName[locale],
    alternateName:
      locale === "fa" ? SEO_CONFIG.siteName.en : SEO_CONFIG.siteName.fa,
    url: SEO_CONFIG.baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.baseUrl}${SEO_CONFIG.defaultImages.logo}`,
    },
    description: SEO_CONFIG.description[locale],
    sameAs: [SEO_CONFIG.author.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Persian", "English"],
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
