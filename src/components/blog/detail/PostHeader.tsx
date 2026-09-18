import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import { formatRelativeTime } from "@/utils/formatters";
import { Calendar, Tag } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";

interface PostHeaderProps {
  post: Post;
}

export async function PostHeader({ post }: PostHeaderProps) {
  const locale = await getLocale();
  const style = post?.category ? getCategoryStyle(post?.category?.slug) : null;

  return (
    <header className="mb-8">
      {post?.category && style && (
        <Link
          href={`/blog?category=${post?.category?.slug}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-6 transition-colors hover:opacity-80",
            style.badgeColor,
          )}
        >
          <Tag className="h-3 w-3" aria-hidden="true" />
          <span>{post?.category?.name}</span>
        </Link>
      )}

      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-6"
        itemProp="headline"
      >
        <span className="relative inline">
          {post.title}
          <svg
            className="absolute -bottom-2 inset-s-0 w-full text-brand-accent/30"
            viewBox="0 0 300 12"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M2 8 Q75 2 150 8 T298 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time dateTime={post?.createdAt} itemProp="datePublished">
            {formatRelativeTime(post?.createdAt, locale)}
          </time>
        </div>
      </div>

      {post?.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border/50 shadow-lg">
          <Image
            src={post?.imageUrl}
            alt={post?.title}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            itemProp="image"
          />
        </div>
      )}
    </header>
  );
}
