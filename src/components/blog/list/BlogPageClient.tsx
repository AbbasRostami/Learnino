"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { PostsGridSkeleton } from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useInfinitePosts } from "@/services";
import type { GetPostsParams, Post } from "@/types";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsString } from "nuqs";
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

  const { params, apiParams, searchValue, setSearch, setFilter } =
    useAdminTableParams<GetPostsParams>({
      defaultLimit: 9,
      customParsers: {
        category: parseAsString.withDefault(""),
      },
    });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts(apiParams);

  const posts =
    data?.pages.flatMap((page) => page?.data?.items ?? []) ?? initialPosts;

  const showSkeleton =
    isLoading && initialPosts.length === 0 && posts.length === 0;
  const isEmpty = !showSkeleton && posts.length === 0;

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

      <BlogFilters
        searchTerm={searchValue}
        selectedCategory={params.category ?? ""}
        sortBy={params.sortBy}
        onSearchChange={setSearch}
        onCategoryChange={(cat) => setFilter("category", cat)}
        onSortToggle={() =>
          setFilter(
            "sortBy",
            params.sortBy === "createdAt" ? "title" : "createdAt",
          )
        }
      />

      {showSkeleton ? (
        <PostsGridSkeleton count={6} showHeader={false} />
      ) : isEmpty ? (
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

      {hasNextPage && !showSkeleton && !isEmpty && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full px-8 cursor-pointer gap-2 shadow-sm font-bold"
          >
            {isFetchingNextPage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            <span>{t("loadMoreBlogs")}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
