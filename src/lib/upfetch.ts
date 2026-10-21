import { up } from "up-fetch";
import { useAuthStore } from "../store/authStore";

const isServer = typeof window === "undefined";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const CLEAN_BASE_URL = `${RAW_BASE_URL.replace(/\/$/, "")}/api`;

const API_BASE_URL = isServer
  ? CLEAN_BASE_URL
  : process.env.NODE_ENV === "development"
    ? "/api"
    : CLEAN_BASE_URL;

const DEFAULT_LOCALE = "fa";
const SUPPORTED_LOCALES = ["fa", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const getCurrentLocale = (): Locale => {
  if (isServer) {
    return DEFAULT_LOCALE;
  }

  try {
    const pathLocale = window.location.pathname.split("/")[1];
    if (SUPPORTED_LOCALES.includes(pathLocale as Locale)) {
      return pathLocale as Locale;
    }

    const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
    if (cookieMatch && SUPPORTED_LOCALES.includes(cookieMatch[1] as Locale)) {
      return cookieMatch[1] as Locale;
    }
  } catch {
    return DEFAULT_LOCALE;
  }

  return DEFAULT_LOCALE;
};

let refreshPromise: Promise<boolean> | null = null;

const refreshAccessToken = async () => {
  if (isServer) return false;

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept-Language": getCurrentLocale(),
    },
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

const handleSessionExpired = () => {
  if (isServer) return;

  useAuthStore.getState().resetAuth();

  const locale = getCurrentLocale();
  const homePath = `/${locale}`;

  if (window.location.pathname !== homePath) {
    window.location.href = homePath;
  }
};

const PUBLIC_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/resend-verification",
  "/auth/resend-reset-code",
  "/auth/refresh",
];

const isPublicAuthEndpoint = (url: string) => {
  return PUBLIC_AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

const authenticatedFetch: typeof fetch = async (input, init) => {
  const isRequestInstance =
    typeof Request !== "undefined" && input instanceof Request;

  const requestUrl =
    typeof input === "string"
      ? input
      : isRequestInstance
        ? input.url
        : String(input);

  const firstAttemptInput = isRequestInstance ? input.clone() : input;

  const response = await fetch(firstAttemptInput, init);

  if (response.status !== 401) {
    return response;
  }

  if (isServer || isPublicAuthEndpoint(requestUrl)) {
    return response;
  }

  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    handleSessionExpired();
    return response;
  }

  const retryInput = isRequestInstance ? input.clone() : input;
  return fetch(retryInput, init);
};

interface RejectedApiError extends Error {
  status?: number;
  data?: unknown;
}

export const api = up(authenticatedFetch, () => ({
  baseUrl: API_BASE_URL,
  credentials: "include",
  timeout: isServer ? 6000 : 50000,
  headers: {
    Accept: "application/json",
    "Accept-Language": getCurrentLocale(),
  },

  parseRejected: async (response: Response) => {
    let body: Record<string, unknown> | null = null;
    try {
      body = (await response.json()) as Record<string, unknown>;
    } catch {
      body = null;
    }

    let errorMessage = "خطایی رخ داده است";

    if (body && typeof body.message === "string") {
      errorMessage = body.message;
    } else if (body && body.data && typeof body.data === "object") {
      const dataObj = body.data as Record<string, unknown>;
      if (typeof dataObj.message === "string") {
        errorMessage = dataObj.message;
      } else {
        const keys = Object.keys(dataObj);
        if (keys.length > 0 && typeof dataObj[keys[0]] === "string") {
          errorMessage = dataObj[keys[0]] as string;
        }
      }
    }

    const error: RejectedApiError = new Error(errorMessage);
    error.status = response.status;
    error.data = body?.data || null;

    return error;
  },
}));
