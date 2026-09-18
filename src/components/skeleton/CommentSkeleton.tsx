import { Skeleton } from "@/components/ui/skeleton";

export function CommentSkeleton() {
  return (
    <div
      className="flex gap-3 p-4 rounded-2xl border border-border/40 bg-card/40"
      aria-hidden="true"
    >
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>

        <div className="flex flex-col gap-1.5 mt-1">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-2/3 rounded" />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface CommentsListSkeletonProps {
  count?: number;
}

export function CommentsListSkeleton({ count = 3 }: CommentsListSkeletonProps) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </div>
  );
}
