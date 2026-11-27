import { PostDetailClient } from "@/components/blog/detail";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import { PostDetailSkeleton } from "@/components/skeleton";
import {
  cleanMetaDescription,
  getDynamicCanonical,
  getFullUrl,
  PRIVATE_ROBOTS,
  safeEncodeSlug,
  SEO_CONFIG,
  type Locale,
} from "@/lib/seo";
import { getPostBySlugServer } from "@/services/post/posts";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
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

  const decodedUrlSlug = decodeURIComponent(slug);
  const decodedPostSlug = decodeURIComponent(post?.slug);
  if (decodedUrlSlug !== decodedPostSlug) {
    permanentRedirect(`/${locale}/blog/${safeEncodeSlug(post?.slug)}`);
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

      <PostDetailClient slug={post.slug} initialPost={post} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const post = await getPostBySlugServer(locale, slug);

    if (!post) {
      return {
        title: locale === "fa" ? "مقاله یافت نشد" : "Article Not Found",
        robots: PRIVATE_ROBOTS,
      };
    }

    const canonicalSlug = post.slug;
    const description = cleanMetaDescription(post?.content || "");
    const isFa = locale === "fa";
    const fullPageUrl = getFullUrl(
      `/blog/${safeEncodeSlug(canonicalSlug)}`,
      locale,
    );

    const rawImageUrl = post?.imageUrl || SEO_CONFIG.defaultImages.og;
    const ogImage = rawImageUrl.startsWith("http")
      ? rawImageUrl
      : getFullUrl(rawImageUrl);

    return {
      title: post?.title,
      description,
      openGraph: {
        type: "article",
        title: post?.title,
        description,
        url: fullPageUrl,
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
        tags: post?.category ? [post?.category.name] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post?.title,
        description,
        images: [ogImage],
      },
      alternates: getDynamicCanonical({
        basePath: "blog",
        locale,
        canonicalSlug,
      }),
    };
  } catch {
    return {
      title:
        locale === "fa" ? "خطا در دریافت اطلاعات" : "Error Loading Article",
      robots: PRIVATE_ROBOTS,
    };
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetailSection paramsPromise={params} />
      </Suspense>
    </main>
  );
}
