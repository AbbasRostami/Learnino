"use client";

import { AdminDataTable } from "@/components/admin/shared/AdminDataTable";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";
import { buttonVariants } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminPosts } from "@/services";
import type { Post } from "@/types";
import { FileText, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getPostsColumns } from "./columns";
import { PostsFilters } from "./PostsFilters";

export function AdminPostsClient() {
  const t = useTranslations("admin.posts");
  const locale = useLocale();
  const router = useRouter();

  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    published: parseAsString.withDefault(""),
    sortBy: parseAsString.withDefault("createdAt"),
    order: parseAsString.withDefault("desc"),
  });

  const { data, isLoading, isFetching } = useAdminPosts({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    published: (params.published as "true" | "false") || undefined,
  });

  const posts = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const handleEdit = (post: Post) => {
    router.push(`/admin/posts/${post.slug || post.id}`);
  };

  const columns = getPostsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onEdit: handleEdit,
  });

  const handleResetFilters = () => {
    setParams({
      search: null,
      published: null,
      sortBy: "createdAt",
      order: "desc",
      page: 1,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {t("pageTitle")}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {pagination?.total
                ? t("postsCount", { count: pagination.total })
                : t("pageSubtitle")}
            </p>
          </div>
        </div>

        <Link
          href="/admin/posts/create"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-xl h-11 gap-2 cursor-pointer shadow-xs bg-primary hover:bg-primary/90 text-white",
          )}
        >
          <Plus className="h-4 w-4" />
          <span>{t("createNew")}</span>
        </Link>
      </div>

      <PostsFilters
        search={params.search}
        published={params.published}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={(v) => setParams({ search: v || null, page: 1 })}
        onPublishedChange={(v) =>
          setParams({ published: v === "all" ? null : v, page: 1 })
        }
        onSortByChange={(v) => setParams({ sortBy: v, page: 1 })}
        onOrderChange={(v) => setParams({ order: v, page: 1 })}
        onResetFilters={handleResetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={posts}
        isLoading={isLoading}
        emptyStateMessage={t("table.noPostsFound")}
        emptyStateDescription={t("table.noPostsDescription")}
      />

      {pagination && pagination.total > 0 && (
        <AdminPagination
          currentPage={params.page}
          limit={params.limit}
          totalCount={pagination.total}
          onPageChange={(page) => setParams({ page })}
          onLimitChange={(limit) => setParams({ limit, page: 1 })}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
