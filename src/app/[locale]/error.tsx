"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("error.serverError");

  useEffect(() => {
    console.error("[App Error]", error.message, "Digest:", error.digest);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-rose-500/10 border-2 border-rose-500/20">
          <AlertTriangle className="h-12 w-12 sm:h-14 sm:w-14 text-rose-500" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
        {t("title")}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-2 leading-relaxed">
        {t("description")}
      </p>

      {error.digest && (
        <p
          className="text-xs text-muted-foreground/60 mb-8"
          dir="ltr"
        >
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={retry}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full gap-2 px-8 shadow-lg shadow-primary/20 cursor-pointer font-bold",
          )}
        >
          <RefreshCw className="h-4 w-4" />
          <span>{t("retry")}</span>
        </button>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-full gap-2 px-8 font-bold",
          )}
        >
          <Home className="h-4 w-4" />
          <span>{t("backToHome")}</span>
        </Link>
      </div>
    </div>
  );
}
