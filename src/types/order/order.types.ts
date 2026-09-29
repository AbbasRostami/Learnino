import type {
  ApiSuccessResponse,
  Pagination,
  PaginationSearchParams,
} from "../common";

export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

export type PaymentMethod = "WALLET" | "ZARINPAL";

export type OrderItem = {
  id: string;
  courseId: string | null;
  courseTitle: string;
  courseSlug: string;
  courseImageUrl: string | null;
  price: number;
  createdAt: string;
};

export type OrderItemSummary = {
  id: string;
  courseTitle: string;
  price: number;
};

export type OrderUser = {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
};

export type Order = {
  id: string;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  discountCode: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

export type OrderListItem = Omit<Order, "items"> & {
  items: OrderItemSummary[];
};

export type AdminOrder = Order & {
  user: OrderUser;
};

export type AdminOrderListItem = Omit<Order, "items"> & {
  user: OrderUser;
  items: OrderItemSummary[];
};

export type GetMyOrdersParams = {
  page?: number;
  limit?: number;
  status?: OrderStatus;
};

export type GetAdminOrdersParams = PaginationSearchParams & {
  status?: OrderStatus;
};

export type GetMyOrdersResponse = ApiSuccessResponse<{
  items: OrderListItem[];
  pagination: Pagination;
}>;

export type GetOrderResponse = ApiSuccessResponse<{
  order: Order;
}>;

export type GetAdminOrdersResponse = ApiSuccessResponse<{
  items: AdminOrderListItem[];
  pagination: Pagination;
}>;

export type GetAdminOrderResponse = ApiSuccessResponse<{
  order: AdminOrder;
}>;

export type CancelOrderResponse = ApiSuccessResponse<{
  message: string;
  order: Order;
}>;

export type AdminCancelOrderResponse = ApiSuccessResponse<{
  message: string;
  order: AdminOrder;
}>;
