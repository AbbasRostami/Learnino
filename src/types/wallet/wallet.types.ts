import type {
  ApiSuccessResponse,
  Pagination,
  PaginationParams,
  PaginationSearchParams,
} from "../common";

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export type TransactionType = "CHARGE" | "PURCHASE" | "REFUND";

export type Wallet = {
  id: string;
  balance: number;
  userId: string;
  updatedAt: string;
};

export type TransactionCourseRef = {
  id: string;
  title: string;
  slug: string;
} | null;

export type TransactionUserRef = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
};

export type Transaction = {
  id: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
  description: string | null;
  refId?: string | null;
  authority?: string | null;
  course?: TransactionCourseRef;
  createdAt: string;
  userId?: string;
  user?: TransactionUserRef;
};

export type AdminWalletItem = Wallet & {
  user: TransactionUserRef;
};

export type GetTransactionsParams = PaginationParams & {
  status?: TransactionStatus;
  type?: TransactionType;
};

export type GetAdminWalletsParams = PaginationSearchParams & {
  minBalance?: number;
  maxBalance?: number;
};

export type GetAdminTransactionsParams = PaginationParams & {
  status?: TransactionStatus;
  type?: TransactionType;
  userId?: string;
  startDate?: string;
  endDate?: string;
};

export type ChargeWalletPayload = {
  amount: number;
};

export type GetWalletResponse = ApiSuccessResponse<{
  wallet: Wallet;
}>;

export type ChargeWalletResponse = ApiSuccessResponse<{
  message: string;
  paymentUrl: string;
  transactionId: string;
  authority: string;
}>;

export type GetTransactionsResponse = ApiSuccessResponse<{
  items: Transaction[];
  pagination: Pagination;
}>;

export type GetAdminWalletsResponse = ApiSuccessResponse<{
  items: AdminWalletItem[];
  pagination: Pagination;
}>;

export type GetAdminTransactionsResponse = ApiSuccessResponse<{
  items: Transaction[];
  pagination: Pagination;
}>;
