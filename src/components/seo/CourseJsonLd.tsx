import { cleanMetaDescription, SEO_CONFIG, type Locale } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/seo/metadata-helpers";
import type { Course } from "@/types";
import Script from "next/script";

interface CourseJsonLdProps {
  course: Course;
  locale: Locale;
}

export function CourseJsonLd({ course, locale }: CourseJsonLdProps) {
  const description = cleanMetaDescription(course?.description || "", 500);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course?.title,
    description,
    url: `${SEO_CONFIG.baseUrl}/${locale}/courses/${course?.slug}`,
    ...(course?.imageUrl && { image: course.imageUrl }),

    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName[locale],
      url: SEO_CONFIG.baseUrl,
      "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    },

    educationalLevel: course?.level,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    datePublished: course?.createdAt,
    offers: {
      "@type": "Offer",
      price: String(course?.price ?? 0),
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.baseUrl}/${locale}/courses/${course?.slug}`,
      category: course?.price === 0 ? "Free" : "Paid",
    },
    ...(course?.teacher && {
      instructor: {
        "@type": "Person",
        name: course.teacher.name,
        url: `${SEO_CONFIG.baseUrl}/${locale}/teachers/${course.teacher.slug}`,
      },
    }),
    ...(course?.category && {
      about: {
        "@type": "Thing",
        name: course.category.name,
      },
    }),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    },
  };

  return (
    <Script
      id={`course-jsonld-${course?.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
