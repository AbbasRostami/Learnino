import { Pagination } from "./pagination.types";

export type ApiQueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean)[];

export type ApiQueryParams = Record<string, ApiQueryParamValue>;

export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
};

export type MessageResponse = ApiSuccessResponse<{
  message: string;
}>;

export type PaginatedResponse<T> = ApiSuccessResponse<{
  items: T[];
  pagination: Pagination;
}>;
