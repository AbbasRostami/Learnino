import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 backdrop-blur-sm">
      <div className="relative aspect-16/10 w-full p-1.5">
        <Skeleton className="h-full w-full rounded-[1.5rem]" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5 gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </div>

        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full rounded-md opacity-60" />
          <Skeleton className="h-4 w-full rounded-md opacity-60" />
          <Skeleton className="h-4 w-2/3 rounded-md opacity-60" />
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-border/60">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-10 rounded-md" />
            <Skeleton className="h-5 w-10 rounded-md" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
