import { Skeleton } from "@/components/ui/skeleton";

interface CoursesGridSkeletonProps {
  count?: number;
}

export function CoursesGridSkeleton({ count = 6 }: CoursesGridSkeletonProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block">
          <Skeleton className="h-125 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: count }).map((_, i) => (
            <article
              key={i}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card"
              aria-hidden="true"
            >
              <Skeleton className="aspect-16/10 w-full rounded-none" />
              <div className="flex flex-col gap-3 p-5">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
