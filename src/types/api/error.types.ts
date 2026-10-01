export interface ApiErrorData {
  status?: "fail" | "error";
  message?: string;
  data?: Record<string, string> | null;
  code?: number;
}

export interface ApiError extends Error {
  status?: number;
  data?: ApiErrorData;
}
