"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const COPY = {
  fa: {
    title: "خطای بحرانی سیستم",
    description:
      "متأسفانه خطای غیرمنتظره‌ای در بارگذاری ساختار اصلی برنامه رخ داده است.",
    retry: "تلاش مجدد",
  },
  en: {
    title: "Critical system error",
    description:
      "An unexpected error occurred while loading the application shell.",
    retry: "Try again",
  },
} as const;

function resolveLang(): "fa" | "en" {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
    if (match?.[1] === "en" || match?.[1] === "fa") return match[1];
  }
  if (
    typeof navigator !== "undefined" &&
    navigator.language.toLowerCase().startsWith("fa")
  ) {
    return "fa";
  }
  return "en";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const t = COPY[lang];

  useEffect(() => {
    setLang(resolveLang());
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <body className="bg-background text-foreground flex min-h-screen items-center justify-center p-4">
        <div className="flex max-w-md flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 text-center shadow-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-black">{t.title}</h1>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t.description}
          </p>
          {error.digest ? (
            <p className="text-xs text-muted-foreground/60" dir="ltr">
              Error ID: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>{t.retry}</span>
          </button>
        </div>
      </body>
    </html>
  );
}
