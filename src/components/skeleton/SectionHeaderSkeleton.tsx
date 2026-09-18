import { Skeleton } from "@/components/ui/skeleton";

export function SectionHeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-8 w-64 rounded-xl" />
      </div>
      <Skeleton className="h-6 w-28 rounded-lg hidden sm:block" />
    </div>
  );
}