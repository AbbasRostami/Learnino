"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function AdminOverviewSkeleton() {
  const mainColors = [
    "bg-emerald-500/10 border-emerald-500/20",
    "bg-amber-500/10 border-amber-500/20",
    "bg-primary/10 border-primary/20",
    "bg-brand-accent/10 border-brand-accent/20",
  ];

  const secondaryColors = [
    "bg-brand-cyan/10 border-brand-cyan/20",
    "bg-indigo-500/10 border-indigo-500/20",
    "bg-blue-500/10 border-blue-500/20",
    "bg-rose-500/10 border-rose-500/20",
    "bg-fuchsia-500/10 border-fuchsia-500/20",
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-linear-to-br from-primary/10 via-brand-accent/10 to-brand-cyan/5 p-8 sm:p-10 shadow-xl min-h-40">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl animate-pulse" />
        <div className="relative flex flex-col items-start gap-5">
          <Skeleton className="h-6 w-24 rounded-full bg-primary/20" />
          <Skeleton className="h-10 w-64 sm:w-96 rounded-2xl bg-foreground/10" />
          <Skeleton className="h-4 w-48 sm:w-72 rounded-lg bg-foreground/5" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {mainColors.map((color, i) => (
            <div
              key={i}
              className="p-6 rounded-[2rem] border border-white/10 bg-card shadow-xl flex items-center justify-between"
            >
              <div className="space-y-3 w-1/2">
                <Skeleton className="h-3 w-3/4 rounded-full bg-muted-foreground/20" />
                <Skeleton className="h-8 w-full rounded-xl bg-foreground/10" />
                <Skeleton className="h-2 w-1/2 rounded-full bg-muted-foreground/20" />
              </div>
              <Skeleton
                className={cn("h-14 w-14 rounded-2xl shrink-0", color)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {secondaryColors.map((color, i) => (
            <div
              key={i}
              className="p-4 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-xs flex flex-col gap-3"
            >
              <Skeleton className={cn("h-10 w-10 rounded-xl", color)} />
              <div className="space-y-2 w-3/4">
                <Skeleton className="h-2.5 w-full rounded-full bg-muted-foreground/20" />
                <Skeleton className="h-6 w-1/2 rounded-lg bg-foreground/10" />
                <Skeleton className="h-2 w-3/4 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[2rem] border border-border/50 bg-card/60 backdrop-blur-md shadow-xs p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded-lg bg-foreground/10" />
              <Skeleton className="h-3 w-64 rounded-full bg-muted-foreground/20" />
            </div>
            <Skeleton className="h-9 w-32 rounded-xl bg-muted" />
          </div>
          <Skeleton className="flex-1 min-h-62.5 w-full rounded-2xl bg-muted/30" />
        </div>

        <div className="h-87.5 lg:col-span-1 rounded-3xl bg-linear-to-b from-card/80 to-card/40 border border-border/40 p-6 flex flex-col items-center justify-between shadow-xs">
          <div className="w-full flex justify-start">
            <Skeleton className="h-4 w-24 rounded-lg bg-muted-foreground/20" />
          </div>
          <div className="relative w-40 h-40 rounded-full border-14 border-muted/30 flex items-center justify-center animate-pulse">
            <div className="absolute inset-0 rounded-full border-14 border-primary/10 border-t-transparent border-r-transparent rotate-45" />
            <div className="space-y-1.5 flex flex-col items-center">
              <Skeleton className="h-3 w-12 rounded-full bg-muted-foreground/20" />
              <Skeleton className="h-4 w-16 rounded-full bg-primary/15" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <Skeleton className="h-2 w-full rounded-full bg-muted/60" />
            <Skeleton className="h-2 w-5/6 rounded-full bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
