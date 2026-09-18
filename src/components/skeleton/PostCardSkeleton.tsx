import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40"
      aria-hidden="true"
    >
      <Skeleton className="aspect-video w-full rounded-none" />

      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-5 w-24 rounded-full" />

        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-4/5 rounded-lg" />

        <div className="flex flex-col gap-2 mt-1">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-3/4 rounded" />
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
    </article>
  );
}
