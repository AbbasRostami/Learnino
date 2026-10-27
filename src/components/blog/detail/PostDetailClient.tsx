"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { usePost } from "@/services";
import type { Post } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import { Calendar, FileText, Tag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { CommentsSection } from "./comments/CommentsSection";
import { PostContent } from "./PostContent";
import { PostFavoriteButton } from "./PostFavoriteButton";
import { PostReactions } from "./PostReactions";
import { PostShareButton } from "./PostShareButton";
import { PostSidebar } from "./PostSidebar";

interface PostDetailClientProps {
  slug: string;
  initialPost: Post;
}

export function PostDetailClient({ slug, initialPost }: PostDetailClientProps) {
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const { data } = usePost(slug, initialPost);
  const post = data?.data?.post ?? initialPost;

  const style = post?.category ? getCategoryStyle(post?.category?.slug) : null;
  const breadcrumbItems = [
    { label: tNav("blog"), href: "/blog" },
    ...(post?.category
      ? [
          {
            label: post?.category?.name,
            href: `/blog?category=${post?.category?.slug}`,
          },
        ]
      : []),
    { label: post?.title },
  ];

  return (
    <article
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <AppBreadcrumb items={breadcrumbItems} className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
        <div className="min-w-0">
          <header className="mb-8">
            {post?.category && style && (
              <Link
                href={`/blog?category=${post?.category?.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black mb-6 transition-colors hover:opacity-90 shadow-xs border border-current/20",
                  style.badgeColor,
                )}
              >
                <Tag className="h-3 w-3" aria-hidden="true" />
                <span>{post?.category?.name}</span>
              </Link>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-4 wrap-break-word">
              {post?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/40 pb-6 mb-6">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post?.createdAt} itemProp="datePublished">
                  {formatRelativeTime(post?.createdAt, locale)}
                </time>
              </div>

              <div className="flex items-center gap-2 ms-auto">
                <PostReactions
                  postId={post?.id}
                  postSlug={slug}
                  reactions={post?.reactions}
                />
                <PostFavoriteButton
                  postId={post?.id}
                  isFavorite={post?.isFavorite}
                />
                <PostShareButton title={post?.title} slug={post?.slug} />
              </div>
            </div>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl mb-10 border border-border/50 shadow-lg bg-muted">
            {post?.imageUrl ? (
              <Image
                src={post?.imageUrl}
                alt={post?.title}
                fill
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                itemProp="image"
              />
            ) : (
              <div className="flex flex-col h-full w-full items-center justify-center bg-linear-to-br from-primary/10 via-brand-accent/5 to-transparent">
                <FileText className="h-20 w-20 text-muted-foreground/30 mb-4" />
                <span className="text-xl font-black text-muted-foreground/40">
                  {post?.title}
                </span>
              </div>
            )}
          </div>

          <PostContent content={post?.content ?? ""} />

          <hr className="border-dashed border-border/60 my-12" />

          <CommentsSection postSlug={slug} postId={post?.id} />
        </div>

        <aside className="hidden lg:block sticky top-24 h-fit">
          <PostSidebar categorySlug={post?.category?.slug} />
        </aside>
      </div>

      <meta itemProp="url" content={`/blog/${post?.slug}`} />
    </article>
  );
}
