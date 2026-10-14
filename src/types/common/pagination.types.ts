import type { ApiQueryParams } from "./api.types";

export type Pagination = {
  total: number;
  page: number;
  limit: number;
};

export type PaginationParams = ApiQueryParams & {
  page?: number;
  limit?: number;
};

export type PaginationSearchParams = PaginationParams & {
  search?: string;
};
