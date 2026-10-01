export type Pagination = {
  total: number;
  page: number;
  limit: number;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationSearchParams = PaginationParams & {
  search?: string;
};
