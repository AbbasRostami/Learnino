import { SEO_CONFIG, serializeJsonLd } from "@/lib/seo";
import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item?.name,
      ...(item?.url && { item: `${SEO_CONFIG.baseUrl}${item?.url}` }),
    })),
  };

  const uniqueId = items
    .map((i) => i?.name)
    .join("-")
    .replace(/\s+/g, "");

  return (
    <Script
      id={`breadcrumb-jsonld-${uniqueId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
