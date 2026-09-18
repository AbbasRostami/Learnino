import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-hidden="true"
    >
      <Skeleton className="aspect-video w-full rounded-none" />

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 rounded-lg" />

        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </article>
  );
}
