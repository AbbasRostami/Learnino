"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { cn } from "@/lib/utils";
import type { UserProfileResponse } from "@/types";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

interface OverviewGreetingProps {
  profile: UserProfileResponse["data"]["profile"] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  isRetrying?: boolean;
  onRetry?: () => void;
}

export function OverviewGreeting({
  profile,
  isLoading = false,
  isError = false,
  isRetrying = false,
  onRetry,
}: OverviewGreetingProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12
      ? locale === "fa"
        ? "صبح بخیر"
        : "Good morning"
      : hour < 17
        ? locale === "fa"
          ? "ظهر بخیر"
          : "Good afternoon"
        : locale === "fa"
          ? "عصر بخیر"
          : "Good evening";

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-primary/20 p-6 sm:p-8 shadow-xl",
        "bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5",
      )}
    >
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            <span>{timeGreeting}</span>
          </div>

          {(isError || (!isLoading && !profile)) && onRetry ? (
            <DashboardQueryError
              compact
              onRetry={onRetry}
              isRetrying={isRetrying}
            />
          ) : isLoading || !profile ? (
            <div className="space-y-2 my-2">
              <Skeleton className="h-8 w-64 rounded-2xl bg-primary/20 animate-pulse" />
              <Skeleton className="h-4 w-48 rounded-xl bg-primary/10 animate-pulse" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
                {t("welcome", { name: profile?.name || profile?.email })}
              </h1>
              <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                {t("welcomeSubtitle")}
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
