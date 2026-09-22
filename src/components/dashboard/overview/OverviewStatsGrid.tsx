"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ProfileOverviewResponse } from "@/types";
import {
  BookOpen,
  Heart,
  MessageSquare,
  Package,
  ShoppingCart,
  ThumbsUp,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

interface OverviewStatsGridProps {
  overview: ProfileOverviewResponse["data"]["overview"] | undefined;
  isLoading: boolean;
}

export function OverviewStatsGrid({
  overview,
  isLoading,
}: OverviewStatsGridProps) {
  const t = useTranslations("dashboard.stats");
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    {
      key: "totalCourses",
      value: overview?.enrollment?.total ?? 0,
      icon: BookOpen,
      gradient: "from-primary to-indigo-500",
      bgGradient: "from-primary/10 to-transparent",
    },
    {
      key: "totalOrders",
      value: overview?.order?.total ?? 0,
      subValue: overview?.order?.active ?? 0,
      icon: Package,
      gradient: "from-brand-accent to-purple-500",
      bgGradient: "from-brand-accent/10 to-transparent",
    },
    {
      key: "totalComments",
      value: overview?.comment?.total ?? 0,
      subValue: overview?.comment?.pending ?? 0,
      icon: MessageSquare,
      gradient: "from-brand-cyan to-cyan-500",
      bgGradient: "from-brand-cyan/10 to-transparent",
    },
    {
      key: "favoriteCourses",
      value:
        (overview?.favorite?.courses ?? 0) + (overview?.favorite?.posts ?? 0),
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-500/10 to-transparent",
    },
    {
      key: "cartItems",
      value: overview?.cart?.items ?? 0,
      icon: ShoppingCart,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-transparent",
    },
    {
      key: "totalReactions",
      value: overview?.reaction?.total ?? 0,
      icon: ThumbsUp,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-transparent",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-3xl border border-border/50 bg-card/60 flex justify-between items-start"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20 rounded-md bg-muted/80" />
              <Skeleton className="h-7 w-16 rounded-xl bg-primary/20 animate-pulse" />
            </div>
            <Skeleton className="h-10 w-10 rounded-2xl bg-primary/10 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats?.map((stat, index) => (
        <motion.article
          key={stat?.key}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-primary/30 transition-all",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity",
              stat?.bgGradient,
            )}
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-muted-foreground mb-2 truncate">
                {t(stat?.key)}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stat?.value.toLocaleString()}
              </div>
            </div>

            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br shadow-md group-hover:scale-110 transition-transform",
                stat?.gradient,
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
