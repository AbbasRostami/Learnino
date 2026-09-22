"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FavoritesCardSkeleton() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-20 rounded-full bg-rose-500/15" />
          <Skeleton className="h-3 w-14 rounded-md bg-muted" />
        </div>

        <div className="flex flex-col gap-2 min-h-12">
          <Skeleton className="h-4 w-full rounded-lg bg-primary/15" />
          <Skeleton className="h-4 w-4/5 rounded-lg bg-primary/10" />
        </div>

        <div className="mt-auto pt-4 border-t border-dashed border-border/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded bg-rose-500/20" />
            <Skeleton className="h-3 w-10 rounded-md bg-muted" />
            <Skeleton className="h-3.5 w-3.5 rounded bg-primary/20" />
            <Skeleton className="h-3 w-10 rounded-md bg-muted" />
          </div>
          <Skeleton className="h-6 w-16 rounded-lg bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
