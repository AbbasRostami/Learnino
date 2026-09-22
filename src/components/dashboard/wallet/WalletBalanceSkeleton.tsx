"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function WalletBalanceSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-card p-6 sm:p-8 flex flex-col justify-between shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-24 rounded-md bg-emerald-500/20" />
          <Skeleton className="h-10 w-48 rounded-xl bg-emerald-500/25" />
        </div>
        <Skeleton className="h-12 w-12 rounded-2xl bg-emerald-500/30" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-md bg-muted" />
        <Skeleton className="h-3 w-4/5 rounded-md bg-muted" />
      </div>
    </div>
  );
}