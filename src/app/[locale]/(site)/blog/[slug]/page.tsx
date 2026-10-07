import { PostDetailClient } from "@/components/blog/detail";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import {
  cleanMetaDescription,
  getAlternates,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import { getPostBySlugServer } from "@/services/post/posts";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PostSectionProps {
  paramsPromise: Promise<{ locale: Locale; slug: string }>;
}

async function PostDetailSection({ paramsPromise }: PostSectionProps) {
  const { locale, slug } = await paramsPromise;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const post = await getPostBySlugServer(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd post={post} locale={locale} />

      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `/${locale}` },
          { name: tNav("blog"), url: `/${locale}/blog` },
          { name: post.title },
        ]}
      />

      <PostDetailClient slug={slug} initialPost={post} />
    </>
  );
}

function PostDetailFallback() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 w-3/4 rounded-xl bg-muted/60 mb-6" />
      <div className="h-4 w-40 rounded-md bg-muted/40 mb-10" />
      <div className="aspect-video w-full rounded-3xl bg-muted/60 mb-10" />
      <div className="space-y-4">
        <div className="h-4 w-full rounded-md bg-muted/40" />
        <div className="h-4 w-11/12 rounded-md bg-muted/40" />
        <div className="h-4 w-10/12 rounded-md bg-muted/40" />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlugServer(locale, slug);

  if (!post) {
    return {
      title: locale === "fa" ? "مقاله یافت نشد" : "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = cleanMetaDescription(post?.content || "");
  const isFa = locale === "fa";
  const ogImage = post?.imageUrl || "/logo/Main-Logo.png";

  return {
    title: post?.title,
    description,

    openGraph: {
      type: "article",
      title: post?.title,
      description,
      url: `/${locale}/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
      locale: isFa ? "fa_IR" : "en_US",
      siteName: SEO_CONFIG.siteName[locale],
      publishedTime: post?.createdAt,
      modifiedTime: post?.updatedAt || post?.createdAt,
      authors: [SEO_CONFIG.author.name],
      tags: post?.category ? [post?.category?.name] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description,
      images: [ogImage],
    },

    alternates: getAlternates(`/blog/${slug}`, locale),
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<PostDetailFallback />}>
        <PostDetailSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
