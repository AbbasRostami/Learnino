"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MyCommentsCardSkeleton() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-dashed border-border/60 bg-linear-to-r from-brand-cyan/5 to-transparent">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-xl bg-brand-cyan/20" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24 rounded-md bg-brand-cyan/15" />
            <Skeleton className="h-3 w-40 rounded-md bg-primary/15" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 rounded-full bg-emerald-500/15" />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-md bg-muted" />
        <Skeleton className="h-3 w-11/12 rounded-md bg-muted" />
        <Skeleton className="h-3 w-2/3 rounded-md bg-muted" />
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-dashed border-border/60 bg-muted/20">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-12 rounded-md bg-primary/15" />
          <Skeleton className="h-4 w-12 rounded-md bg-rose-500/15" />
          <Skeleton className="h-4 w-16 rounded-md bg-muted" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-16 rounded-lg bg-primary/15" />
          <Skeleton className="h-7 w-16 rounded-lg bg-rose-500/15" />
        </div>
      </div>
    </div>
  );
}
