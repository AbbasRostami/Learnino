"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MyCoursesCardSkeleton() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <Skeleton className="aspect-16/10 w-full rounded-none bg-primary/10" />

      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-20 rounded-full bg-primary/15" />
          <Skeleton className="h-3 w-16 rounded-md bg-muted" />
        </div>

        <div className="flex flex-col gap-2 min-h-12">
          <Skeleton className="h-4 w-full rounded-lg bg-primary/15" />
          <Skeleton className="h-4 w-4/5 rounded-lg bg-primary/10" />
        </div>

        <div className="mt-auto pt-4 border-t border-dashed border-border/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded-md bg-primary/20" />
            <Skeleton className="h-3 w-20 rounded-md bg-muted" />
          </div>
          <Skeleton className="h-9 w-24 rounded-xl bg-primary/25" />
        </div>
      </div>
    </div>
  );
}
