"use client";

import { PostsGridSkeleton } from "@/components/skeleton/PostsGridSkeleton";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/services";
import type { Post } from "@/types";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { BlogFilters } from "./BlogFilters";
import { BlogPostCard } from "./BlogPostCard";
import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";

interface BlogPageClientProps {
  initialPosts?: Post[];
  locale: string;
}

export function BlogPageClient({ initialPosts = [] }: BlogPageClientProps) {
  const t = useTranslations("blog");
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    category: parseAsString.withDefault(""),
    sortBy: parseAsString.withDefault("createdAt"),
  });

  const { data, isLoading, isFetching } = usePosts({
    page: hasLoadedMore ? undefined : params.page,
    limit: 9,
    search: params?.search || undefined,
    category: params?.category || undefined,
    sortBy: (params?.sortBy as "createdAt" | "title") || "createdAt",
    order: "desc",
  });

  const posts = hasLoadedMore
    ? allPosts
    : initialPosts.length > 0
      ? initialPosts
      : (data?.data?.items ?? []);
  const pagination = data?.data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;
  const hasMore = pagination ? params.page < totalPages : false;

  const handleLoadMore = async () => {
    setHasLoadedMore(true);
    setAllPosts([...posts, ...(data?.data?.items ?? [])]);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AppBreadcrumb className="mb-6" />
      <div className="flex flex-col items-center text-center gap-4 mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("title")}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-primary via-primary to-brand-accent bg-clip-text text-transparent">
              {t("title")}
            </span>
            <svg
              className="absolute -bottom-2 inset-s-0 w-full text-brand-accent/40"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q75 2 150 8 T298 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          {t("description")}
        </p>
      </div>

      <BlogFilters />

      {isLoading && posts?.length === 0 ? (
        <PostsGridSkeleton count={6} showHeader={false} />
      ) : posts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <FileText className="h-16 w-16 text-muted-foreground/30" />
          <p className="text-lg font-bold text-muted-foreground">
            {t("noResults")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post, index) => (
            <BlogPostCard
              key={post?.id}
              post={post}
              priority={index < 3}
              index={index}
            />
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isFetching}
            className="rounded-full px-8 cursor-pointer gap-2"
          >
            {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            <span>{t("loadMoreComments")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
