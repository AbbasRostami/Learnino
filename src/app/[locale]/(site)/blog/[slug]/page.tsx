import { PostDetailClient } from "@/components/blog/detail/PostDetailClient";
import { getPostBySlugServer } from "@/services/post/posts";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = await getPostBySlugServer(locale, slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-lg font-bold text-muted-foreground">
          {t("postNotFound")}
        </p>
      </div>
    );
  }

  return <PostDetailClient slug={slug} initialPost={post} />;
}
