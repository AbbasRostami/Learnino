import { BlogPageClient } from "@/components/blog/list/BlogPageClient";
import { PostsGridSkeleton } from "@/components/skeleton/PostsGridSkeleton";
import { getLatestPostsServer } from "@/services/post/posts";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const initialPosts = await getLatestPostsServer(locale, 9);

  return (
    <Suspense fallback={<PostsGridSkeleton count={6} />}>
      <BlogPageClient initialPosts={initialPosts} locale={locale} />
    </Suspense>
  );
}
