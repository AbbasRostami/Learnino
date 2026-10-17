"use client";

import { stripHtml } from "@/components/shared/SafeHtml";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import {
  ArrowRight,
  Calendar,
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface BlogPostCardProps {
  post: Post;
  priority?: boolean;
  index?: number;
  locale: string;
}

export function BlogPostCard({
  post,
  priority = false,
  index = 0,
  locale,
}: BlogPostCardProps) {
  const t = useTranslations("blog");
  const prefersReducedMotion = useReducedMotion();
  const style = post?.category ? getCategoryStyle(post?.category?.slug) : null;
  const excerpt = stripHtml(post.content, 120);

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:transform-none"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <Link
        href={`/blog/${post?.slug}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-muted rounded-t-[2rem] p-1.5"
        aria-label={post?.title}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
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
              <FileText className="h-16 w-16 text-muted-foreground/40 drop-shadow-md" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="flex items-center justify-between mb-4">
          {post?.category && style && (
            <span
              className={cn(
                "text-xs font-black px-3 py-1 rounded-full border border-current/20 shadow-sm",
                style.badgeColor,
              )}
            >
              {post?.category?.name}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post?.createdAt} itemProp="datePublished">
              {formatRelativeTime(post?.createdAt, locale)}
            </time>
          </div>
        </div>

        <h3
          className="mb-3 line-clamp-2 text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors min-h-12"
          itemProp="headline"
        >
          <Link href={`/blog/${post?.slug}`}>{post?.title}</Link>
        </h3>

        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 font-medium">
            {excerpt}...
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-border/60">
          <div className="flex items-center gap-4">
            {post?.reactions && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors">
                <Heart className="h-4 w-4" aria-hidden="true" />
                <span className="font-bold">{post?.reactions?.likes ?? 0}</span>
              </div>
            )}
            {post?.stats && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand-cyan transition-colors">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span className="font-bold">{post?.stats?.comments ?? 0}</span>
              </div>
            )}
          </div>
          <Link
            href={`/blog/${post?.slug}`}
            className="flex items-center gap-1.5 text-xs font-black text-primary group-hover:gap-2.5 transition-all bg-primary/10 hover:bg-primary hover:text-white px-3 py-1.5 rounded-full"
          >
            <span>{t("readMore")}</span>
            <ArrowRight
              className="h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
      <meta itemProp="url" content={`/blog/${post?.slug}`} />
    </motion.article>
  );
}
