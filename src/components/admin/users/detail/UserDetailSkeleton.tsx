"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function UserDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-9 w-32 rounded-xl bg-primary/15" />

      <div className="rounded-3xl border border-border/50 bg-card/60 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Skeleton className="h-28 w-28 rounded-3xl bg-primary/25 shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-7 w-48 rounded-lg bg-primary/20" />
            <Skeleton className="h-3 w-64 rounded-md bg-muted" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-xl bg-muted/60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-card/60" />
          ))}
        </div>
      </div>
    </div>
  );
}
