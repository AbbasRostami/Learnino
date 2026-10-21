"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { FavoritePost } from "@/types";
import { FileText, Loader2, MessageCircle, Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface FavoritePostCardProps {
  postData: FavoritePost;
  onRemove: () => void;
  isRemoving: boolean;
  index: number;
}

export function FavoritePostCard({
  postData,
  onRemove,
  isRemoving,
  index,
}: FavoritePostCardProps) {
  const t = useTranslations("blog");
  const prefersReducedMotion = useReducedMotion();
  const style = postData?.category
    ? getCategoryStyle(postData?.category.slug)
    : null;

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs hover:shadow-xl hover:border-primary/30 transition-all h-full"
    >
      <Link
        href={`/blog/${postData?.slug}`}
        className="relative aspect-16/10 w-full overflow-hidden bg-muted"
      >
        {postData?.imageUrl ? (
          <Image
            src={postData?.imageUrl}
            alt={postData?.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <Button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        disabled={isRemoving}
        className="absolute top-3 inset-s-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/90 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 disabled:opacity-50 z-20 cursor-pointer"
      >
        {isRemoving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>

      <div className="flex flex-1 flex-col p-4 gap-3">
        <div className="flex items-center justify-between">
          {postData?.category && style && (
            <Link
              href={`/blog?category=${postData?.category?.slug}`}
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-bold hover:opacity-80 transition-opacity",
                style.badgeColor,
              )}
            >
              {postData?.category?.name}
            </Link>
          )}
        </div>

        <h3 className="text-sm font-black text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-10">
          <Link href={`/blog/${postData?.slug}`}>{postData?.title}</Link>
        </h3>

        <div className="mt-auto pt-3 border-t border-dashed border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-bold">
            <MessageCircle className="h-3 w-3" />
            <span>{postData?.stats?.comments ?? 0}</span>
          </div>

          <Link
            href={`/blog/${postData?.slug}`}
            className="text-xs font-bold text-primary hover:underline underline-offset-4"
          >
            {t("readMore")} ←
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
