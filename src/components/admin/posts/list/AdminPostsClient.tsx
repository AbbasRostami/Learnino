"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { buttonVariants } from "@/components/ui/button";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useAdminPosts } from "@/services";
import {
  VISIBILITY_OPTIONS,
  type GetAdminPostsParams,
  type Post,
} from "@/types";
import { FileText, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getPostsColumns } from "./columns";
import { PostsFilters } from "./PostsFilters";

export function AdminPostsClient() {
  const t = useTranslations("admin.posts");
  const locale = useLocale();
  const router = useRouter();

  const {
    params,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminPostsParams>({
    customParsers: {
      published: parseAsStringEnum([...VISIBILITY_OPTIONS]),
    },
  });

  const { data, isLoading, isFetching } = useAdminPosts(apiParams);

  const posts = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const columns = getPostsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
    onEdit: (post: Post) => router.push(`/admin/posts/${post?.slug || post?.id}`),
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("postsCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={FileText}
        actions={
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
        }
      />

      <PostsFilters
        search={params.search}
        published={params.published}
        sortBy={params.sortBy}
        order={params.order}
        onSearchChange={setSearch}
        onPublishedChange={(v) => setFilter("published", v)}
        onSortByChange={(v) => setFilter("sortBy", v)}
        onOrderChange={(v) => setFilter("order", v)}
        onResetFilters={resetFilters}
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
          onPageChange={setPage}
          onLimitChange={setLimit}
          isLoading={isFetching}
        />
      )}
    </div>
  );
}
