"use client";

import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import {
  ArrowRight,
  Calendar,
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const t = useTranslations("posts");
  const format = useFormatter();
  const style = post?.category ? getCategoryStyle(post?.category.slug) : null;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 motion-reduce:transition-none motion-reduce:hover:transform-none h-full"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <Link
        href={`/blog/${post?.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-muted"
        aria-label={post?.title}
      >
        {post?.imageUrl ? (
          <Image
            src={post?.imageUrl}
            alt={post?.title}
            fill
            priority={priority}
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
            itemProp="image"
          />
        ) : (
          <div
            className={cn(
              "flex h-full items-center justify-center bg-linear-to-br",
              style?.gradient ?? "from-primary/10 to-transparent",
            )}
          >
            <FileText className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-3">
          {post?.category && style && (
            <span
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-full",
                style.badgeColor,
              )}
            >
              {post?.category?.name}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            <time
              dateTime={post?.createdAt}
              itemProp="datePublished"
              className="font-semibold"
            >
              {format.dateTime(new Date(post?.createdAt), {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <h3 className="mb-3 line-clamp-2 text-base md:text-[17px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors min-h-12">
          <Link
            href={`/blog/${post?.slug}`}
            className="hover:underline underline-offset-2"
          >
            {post?.title}
          </Link>
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-border/60">
          <div className="flex items-center gap-3">
            {post?.reactions && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">{post?.reactions?.likes}</span>
              </div>
            )}

            {post?.stats && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-semibold">{post?.stats?.comments}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
            <span>{t("readMore")}</span>
            <ArrowRight
              className="h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <meta itemProp="url" content={`/blog/${post?.slug}`} />
    </article>
  );
}
