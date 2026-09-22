"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl bg-primary/15" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-lg bg-brand-accent/20" />
              <Skeleton className="h-5 w-20 rounded-full bg-emerald-500/15" />
            </div>
            <Skeleton className="h-3 w-32 rounded-md bg-muted" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-40 rounded-md bg-muted mb-1" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-3xl border border-border/50 bg-card/60 shadow-xs"
            >
              <Skeleton className="h-16 w-24 rounded-2xl bg-primary/15" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4 rounded-lg bg-primary/15" />
                <Skeleton className="h-3 w-20 rounded-md bg-muted" />
              </div>
              <Skeleton className="h-6 w-24 rounded-lg bg-primary/20" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg">
          <Skeleton className="h-4 w-32 rounded-md bg-muted mb-1" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 rounded-md bg-muted" />
            <Skeleton className="h-3 w-16 rounded-md bg-primary/15" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24 rounded-md bg-muted" />
            <Skeleton className="h-3 w-20 rounded-md bg-primary/15" />
          </div>
          <hr className="border-dashed border-border/60" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16 rounded-lg bg-primary/15" />
            <Skeleton className="h-7 w-32 rounded-xl bg-primary/25" />
          </div>
        </div>
      </div>
    </div>
  );
}
