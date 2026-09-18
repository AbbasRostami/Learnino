import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeaderSkeleton } from "./SectionHeaderSkeleton";

interface CategoriesSkeletonProps {
  count?: number;
}

export function CategoriesSkeleton({ count = 4 }: CategoriesSkeletonProps) {
  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-hidden="true"
    >
      <SectionHeaderSkeleton />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/50 bg-card/40 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <Skeleton className="h-6 w-3/4 rounded-lg" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
