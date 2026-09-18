import { Skeleton } from "@/components/ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-card/40"
      aria-hidden="true"
    >
      <Skeleton className="h-20 w-24 rounded-xl shrink-0" />

      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <Skeleton className="h-5 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <Skeleton className="h-9 w-9 rounded-full shrink-0" />
    </div>
  );
}

interface CartSkeletonProps {
  count?: number;
}

export function CartSkeleton({ count = 3 }: CartSkeletonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-hidden="true">
      <div className="lg:col-span-2 flex flex-col gap-3">
        {Array.from({ length: count }).map((_, idx) => (
          <CartItemSkeleton key={idx} />
        ))}
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border/50 bg-card/40 h-fit">
        <Skeleton className="h-6 w-32 rounded-lg" />

        <div className="flex flex-col gap-3 pt-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>

        <Skeleton className="h-11 w-full rounded-xl mt-3" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}
