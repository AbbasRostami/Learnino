"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function OrderListCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-dashed border-border/60 bg-linear-to-r from-brand-accent/5 to-transparent">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-9 rounded-2xl bg-brand-accent/20" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24 rounded-md bg-brand-accent/15" />
            <Skeleton className="h-3 w-16 rounded-md bg-muted" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 rounded-full bg-emerald-500/15" />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-3/4 rounded-lg bg-primary/15" />
        <Skeleton className="h-3 w-32 rounded-md bg-muted" />
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-dashed border-border/60 bg-muted/20">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-16 rounded-md bg-muted" />
          <Skeleton className="h-5 w-28 rounded-lg bg-primary/20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-xl bg-rose-500/15" />
          <Skeleton className="h-8 w-20 rounded-xl bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
