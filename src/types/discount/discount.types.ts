import type {
  ApiSuccessResponse,
  Pagination,
  PaginationSearchParams,
} from "../common";

export type DiscountType = "PERCENTAGE" | "AMOUNT";

export type DiscountActiveFilter = "true" | "false";

export type Discount = {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetDiscountsParams = PaginationSearchParams & {
  active?: DiscountActiveFilter;
};

export type CreateDiscountPayload = {
  code: string;
  type: DiscountType;
  value: number;
  maxUses: number;
  expiresInDays: number;
};

export type GetDiscountsResponse = ApiSuccessResponse<{
  items: Discount[];
  pagination: Pagination;
}>;

export type CreateDiscountResponse = ApiSuccessResponse<{
  message: string;
}>;

export type ToggleDiscountResponse = ApiSuccessResponse<{
  message: string;
}>;

export type DeleteDiscountResponse = ApiSuccessResponse<{
  message: string;
}>;
