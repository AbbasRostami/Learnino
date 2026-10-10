"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { PostsGridSkeleton } from "@/components/skeleton/PostsGridSkeleton";
import { Button } from "@/components/ui/button";
import { useDebouncedParam } from "@/hooks/useDebouncedParam";
import { usePosts } from "@/services";
import type { Post } from "@/types";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { BlogFilters } from "./BlogFilters";
import { BlogPostCard } from "./BlogPostCard";
import { EmptyBlogState } from "./EmptyBlogState";

interface BlogPageClientProps {
  initialPosts?: Post[];
  locale: string;
}

export function BlogPageClient({
  initialPosts = [],
  locale,
}: BlogPageClientProps) {
  const t = useTranslations("blog");
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const [params, setParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      search: parseAsString.withDefault(""),
      category: parseAsString.withDefault(""),
      sortBy: parseAsString.withDefault("createdAt"),
    },
    { shallow: true },
  );

  const [searchTerm, setSearchTerm] = useDebouncedParam(
    params.search,
    (search) => setParams({ search, page: 1 }),
  );

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
    : initialPosts.length > 0 && !params.search && !params.category
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
          </span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base font-medium leading-relaxed max-w-xl">
          {t("description")}
        </p>
      </div>

      <BlogFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {isLoading ? (
        <PostsGridSkeleton count={6} showHeader={false} />
      ) : posts?.length === 0 ? (
        <EmptyBlogState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post, index) => (
            <BlogPostCard
              key={post?.id}
              post={post}
              priority={index < 3}
              index={index}
              locale={locale}
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
            className="rounded-full px-8 cursor-pointer gap-2 shadow-sm font-bold"
          >
            {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            <span>{t("loadMoreComments")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
