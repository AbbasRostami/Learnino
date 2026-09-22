"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <Skeleton className="h-10 w-10 rounded-2xl bg-primary/20" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-24 rounded-md bg-primary/15" />
          <Skeleton className="h-3 w-48 rounded-md bg-muted" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-primary/10 via-brand-accent/5 to-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Skeleton className="h-24 w-24 rounded-3xl bg-primary/25" />
          <div className="flex flex-col items-center sm:items-start gap-2 flex-1">
            <Skeleton className="h-6 w-40 rounded-lg bg-primary/20" />
            <Skeleton className="h-3 w-52 rounded-md bg-muted" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-24 rounded-full bg-emerald-500/15" />
              <Skeleton className="h-6 w-32 rounded-full bg-primary/15" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-2xl bg-primary/20" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-32 rounded-xl bg-primary/15" />
            <Skeleton className="h-3 w-52 rounded-md bg-muted" />
          </div>
        </div>

        <hr className="border-dashed border-border/60" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20 rounded-md bg-muted" />
              <Skeleton className="h-11 rounded-xl bg-primary/10" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20 rounded-md bg-muted" />
          <Skeleton className="h-11 rounded-xl bg-muted/60" />
        </div>

        <div className="flex gap-2 mt-2">
          <Skeleton className="h-11 w-32 rounded-xl bg-primary/25" />
          <Skeleton className="h-11 w-24 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
