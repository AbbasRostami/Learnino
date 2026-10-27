"use client";

import {
  AdminDataTable,
  AdminPageHeader,
  AdminPagination,
} from "@/components/admin/shared";
import { useAdminTableParams } from "@/hooks/useAdminTableParams";
import { useAdminComments } from "@/services";
import { COMMENT_STATUSES, GetAdminCommentsParams } from "@/types";
import { MessageSquare } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { parseAsStringEnum } from "nuqs";
import { getCommentsColumns } from "./columns";
import { CommentsFilters } from "./CommentsFilters";

export function AdminCommentsClient() {
  const t = useTranslations("admin.comments");
  const locale = useLocale();

  const {
    params,
    searchValue,
    apiParams,
    setPage,
    setLimit,
    setSearch,
    setFilter,
    resetFilters,
  } = useAdminTableParams<GetAdminCommentsParams>({
    customParsers: {
      status: parseAsStringEnum([...COMMENT_STATUSES]),
    },
  });

  const { data, isLoading, isFetching, isError, refetch } =
    useAdminComments(apiParams);

  const comments = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  const columns = getCommentsColumns({
    t,
    locale,
    page: params.page,
    limit: params.limit,
  });

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title={t("pageTitle")}
        subtitle={
          pagination?.total
            ? t("commentsCount", { count: pagination.total })
            : t("pageSubtitle")
        }
        icon={MessageSquare}
      />

      <CommentsFilters
        search={searchValue}
        status={params.status ?? ""}
        onSearchChange={setSearch}
        onStatusChange={(v) => setFilter("status", v)}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={columns}
        data={comments}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        emptyStateMessage={t("table.noCommentsFound")}
        emptyStateDescription={t("table.noCommentsDescription")}
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
