"use client";

import { stripHtml } from "@/components/shared/SafeHtml"; // ✅ اضافه شد
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { usePosts } from "@/services";
import { FileText, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PostSidebarProps {
  categorySlug?: string;
}

export function PostSidebar({ categorySlug }: PostSidebarProps) {
  const t = useTranslations("blog");

  const { data, isLoading } = usePosts({
    limit: 5,
    category: categorySlug || undefined,
    sortBy: "createdAt",
    order: "desc",
  });

  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl border border-border/50 bg-card shadow-sm dark:bg-card/80">
      <div className="flex items-center gap-2 pb-3 border-b border-border/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          {t("relatedPosts")}
        </h3>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-16 w-20 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : data?.data?.items?.length === 0 ? (
        <p className="text-xs text-muted-foreground py-4 text-center">
          مقاله مرتبطی یافت نشد
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.data?.items?.map((post) => (
            <Link
              key={post?.id}
              href={`/blog/${post?.slug}`}
              className="group flex gap-3 p-2.5 rounded-2xl hover:bg-muted/60 dark:hover:bg-muted/30 transition-colors border border-transparent hover:border-border/40"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted/50 shadow-xs">
                {post?.imageUrl ? (
                  <Image
                    src={post?.imageUrl}
                    alt={post?.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {post?.title}
                </h4>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                  {stripHtml(post?.content, 60)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
