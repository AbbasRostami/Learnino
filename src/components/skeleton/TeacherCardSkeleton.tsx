import { Skeleton } from "@/components/ui/skeleton";

export function TeacherCardSkeleton() {
  return (
    <article
      className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-card/40 container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-hidden="true"
    >
      <Skeleton className="h-24 w-24 rounded-full" />

      <Skeleton className="h-5 w-32 rounded-lg" />

      <div className="flex flex-col gap-2 items-center w-full">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
      </div>

      <Skeleton className="h-6 w-20 rounded-full mt-2" />
    </article>
  );
}
