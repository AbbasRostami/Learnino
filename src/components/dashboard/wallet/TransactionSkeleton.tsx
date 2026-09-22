"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl bg-primary/20" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32 rounded-md bg-primary/15" />
          <Skeleton className="h-3 w-20 rounded-md bg-muted" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Skeleton className="h-5 w-24 rounded-md bg-emerald-500/20" />
        <Skeleton className="h-3 w-16 rounded-md bg-muted" />
      </div>
    </div>
  );
}