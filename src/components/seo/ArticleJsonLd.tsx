import {
  cleanMetaDescription,
  SEO_CONFIG,
  serializeJsonLd,
  type Locale,
} from "@/lib/seo";
import type { Post } from "@/types";
import Script from "next/script";

interface ArticleJsonLdProps {
  post: Post;
  locale: Locale;
}

export function ArticleJsonLd({ post, locale }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SEO_CONFIG.baseUrl}/${locale}/blog/${post?.slug}/#article`,
    headline: post?.title,
    description: cleanMetaDescription(post?.content || "", 300),
    ...(post?.imageUrl && { image: [post?.imageUrl] }),
    datePublished: post?.createdAt,
    dateModified: post?.updatedAt || post?.createdAt,
    author: {
      "@type": "Person",
      name: SEO_CONFIG.author.name,
      url: SEO_CONFIG.author.url,
    },
    publisher: {
      "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.baseUrl}/${locale}/blog/${post?.slug}`,
    },
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    ...(post?.category && {
      articleSection: post?.category?.name,
    }),
  };

  return (
    <Script
      id={`article-jsonld-${post?.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
