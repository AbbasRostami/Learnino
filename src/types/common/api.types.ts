export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
};

export type MessageResponse = ApiSuccessResponse<{
  message: string;
}>;

import type { Pagination } from "./pagination.types";

export type PaginatedResponse<T> = ApiSuccessResponse<{
  items: T[];
  pagination: Pagination;
}>;
