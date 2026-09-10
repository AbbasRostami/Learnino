import { up } from "up-fetch";
import { useAuthStore } from "./authStore";

// ═══════════════════════════════════════════════════
// 1. Constants
// ═══════════════════════════════════════════════════
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

console.log("🚀 API_BASE_URL loaded as:", API_BASE_URL);

const DEFAULT_LOCALE = "fa";
const SUPPORTED_LOCALES = ["fa", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// ═══════════════════════════════════════════════════
// 2. Locale Detection
// ═══════════════════════════════════════════════════
export const getCurrentLocale = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const pathLocale = window.location.pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(pathLocale as Locale)) {
    return pathLocale as Locale;
  }

  const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  if (cookieMatch && SUPPORTED_LOCALES.includes(cookieMatch[1] as Locale)) {
    return cookieMatch[1] as Locale;
  }

  return DEFAULT_LOCALE;
};

// ═══════════════════════════════════════════════════
// 3. Refresh Token Queue
// ═══════════════════════════════════════════════════
let refreshPromise: Promise<boolean> | null = null;

const refreshAccessToken = async () => {
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

// ═══════════════════════════════════════════════════
// 4. Session Expired Handler
// ═══════════════════════════════════════════════════
const handleSessionExpired = () => {
  useAuthStore.getState().resetAuth();

  if (typeof window !== "undefined") {
    const locale = getCurrentLocale();
    const homePath = `/${locale}`;

    if (window.location.pathname !== homePath) {
      window.location.href = homePath;
    }
  }
};

// ═══════════════════════════════════════════════════
// 5. Authenticated Fetch
// ═══════════════════════════════════════════════════
const authenticatedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);

  if (response.status !== 401) {
    return response;
  }

  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    handleSessionExpired();
    return response;
  }

  return fetch(input, init);
};

// ═══════════════════════════════════════════════════
// 6. up-fetch Instance
// ═══════════════════════════════════════════════════
export const api = up(authenticatedFetch, () => ({
  baseUrl: API_BASE_URL,
  credentials: "include",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Accept-Language": getCurrentLocale(),
  },

  parseRejected: async (response) => {
    let body: any;
    try {
      body = await response.json();
    } catch {
      body = {};
    }

    let errorMessage = "خطایی رخ داده است";

    if (body.message) {
      errorMessage = body.message;
    } else if (body.data) {
      if (body.data.message) {
        errorMessage = body.data.message;
      } else {
        const firstFieldKey = Object.keys(body.data)[0];
        if (firstFieldKey) {
          errorMessage = body.data[firstFieldKey];
        }
      }
    }

    const error = new Error(errorMessage) as any;
    error.status = response.status;
    error.data = body.data || null;

    return error;
  },
}));
