"use client";

import { Button } from "@/components/ui/button";
import { RotateCw, ServerCrash } from "lucide-react";
import { useTranslations } from "next-intl";

interface AdminQueryErrorProps {
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export function AdminQueryError({
  onRetry,
  title,
  description,
}: AdminQueryErrorProps) {
  const t = useTranslations("admin.table");

  return (
    <div
      role="alert"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-destructive/20 bg-card/80 px-8 py-12 text-center mx-auto"
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-destructive/20 blur-[50px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-amber-500/10 blur-[50px]" />

      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] border-2 border-destructive/20 bg-destructive/10 text-destructive shadow-inner">
        <div className="absolute inset-0 animate-ping rounded-[2rem] bg-destructive/5 duration-1000" />
        <ServerCrash
          className="h-12 w-12 relative z-10 drop-shadow-sm"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="mb-3 text-xl font-black text-foreground tracking-tight">
        {title || t("errorTitle")}
      </h3>
      <p className="mb-8 text-sm font-medium text-muted-foreground leading-relaxed">
        {description || t("errorDescription")}
      </p>

      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          className="group relative h-12 w-full max-w-50 overflow-hidden rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-destructive/25"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-sm">
            <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            {t("retry")}
          </span>
        </Button>
      )}
    </div>
  );
}
