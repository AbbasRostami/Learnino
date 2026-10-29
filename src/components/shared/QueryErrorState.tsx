"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCw, ServerCrash } from "lucide-react";
import { useTranslations } from "next-intl";

interface QueryErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
  compact?: boolean;
  className?: string;
}

export function QueryErrorState({
  onRetry,
  isRetrying = false,
  compact = false,
  className,
}: QueryErrorStateProps) {
  const t = useTranslations("common.queryError");

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-2xl text-center",
        compact ? "gap-2 p-3" : "gap-3 px-6 py-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-destructive/10 text-destructive",
          compact ? "h-8 w-8" : "h-11 w-11",
        )}
      >
        <ServerCrash
          className={compact ? "h-4 w-4" : "h-5 w-5"}
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className={cn("font-bold text-foreground", compact ? "text-xs" : "text-sm")}>
          {t("title")}
        </p>
        {!compact && (
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRetry}
        disabled={isRetrying}
        className="gap-2 rounded-xl border-destructive/20 cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <RotateCw
          className={cn("h-3.5 w-3.5", isRetrying && "animate-spin")}
          aria-hidden="true"
        />
        {t("retry")}
      </Button>
    </div>
  );
}
