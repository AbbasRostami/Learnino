"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";

export interface StatCardConfig {
  key: string;
  label: string;
  value: number | string;
  subLabel?: string;
  icon: LucideIcon;
  color: string;
  bgHover: string;
}

interface AdminStatsGridProps {
  stats: StatCardConfig[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6;
}

export function AdminStatsGrid({
  stats,
  isLoading = false,
  columns = 4,
}: AdminStatsGridProps) {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  }[columns];

  const formatNumber = (value: number | string) => {
    if (typeof value === "string") return value;
    return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
      value,
    );
  };

  if (isLoading) {
    return (
      <div className={cn("grid gap-3 sm:gap-4", gridClass)}>
        {Array.from({ length: stats.length || columns }).map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-3xl border border-border/50 bg-card/60 flex items-center justify-between"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20 rounded-md bg-muted" />
              <Skeleton className="h-7 w-16 rounded-xl bg-primary/20 animate-pulse" />
              <Skeleton className="h-2.5 w-24 rounded-md bg-muted/60" />
            </div>
            <Skeleton className="h-11 w-11 rounded-2xl bg-primary/15 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-3 sm:gap-4", gridClass)}>
      {stats.map((stat, index) => (
        <motion.article
          key={stat.key}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-primary/30 transition-all"
        >
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity",
              stat.bgHover,
            )}
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-muted-foreground mb-1.5 truncate uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                {formatNumber(stat.value)}
              </div>
              {stat.subLabel && (
                <div className="text-[10px] font-semibold text-muted-foreground truncate">
                  {stat.subLabel}
                </div>
              )}
            </div>

            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-md group-hover:scale-110 transition-transform",
                stat.color,
              )}
            >
              <stat.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
