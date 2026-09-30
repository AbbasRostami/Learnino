import type { ApiSuccessResponse } from "../common";
import type { CourseLevel } from "../course/course.types";
import type { DiscountType } from "../discount/discount.types";

export type CartCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type CartItem = {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  price: number;
  imageUrl: string | null;
  level: CourseLevel;
  category: CartCategoryRef;
  addedAt: string;
};

export type AppliedCartDiscount = {
  code: string;
  type: DiscountType;
  value: number;
};

export type Cart = {
  id: string;
  totalAmount: number;
  totalItems: number;
  items: CartItem[];
  discount?: AppliedCartDiscount | null;

  subtotal: number;
  totalPayment: number;
};

export type AddToCartPayload = {
  courseId: string;
};

export type ApplyDiscountPayload = {
  code: string;
};

export type SyncCartPayload = {
  courseIds: string[];
};

export type GetCartResponse = ApiSuccessResponse<{
  cart: Cart;
}>;

export type ClearCartResponse = ApiSuccessResponse<{
  message: string;
}>;

export type AddToCartResponse = ApiSuccessResponse<{
  message: string;
}>;

export type RemoveFromCartResponse = ApiSuccessResponse<{
  message: string;
}>;

export type ApplyDiscountResponse = ApiSuccessResponse<{
  message: string;
  discount: AppliedCartDiscount;
}>;

export type RemoveDiscountResponse = ApiSuccessResponse<{
  message: string;
}>;

export type SyncCartResponse = ApiSuccessResponse<{
  message: string;
}>;
