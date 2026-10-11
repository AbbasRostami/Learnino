import { Skeleton } from "@/components/ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <Skeleton className="aspect-16/10 w-full sm:w-40 shrink-0 rounded-2xl" />

      <div className="flex flex-1 flex-col justify-between min-w-0 w-full gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-border/60 mt-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartSidebarSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-xl">
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-11 w-full rounded-2xl" />
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-24 rounded-md" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 rounded-2xl" />
          <Skeleton className="h-16 rounded-2xl" />
        </div>
      </div>

      <hr className="border-dashed border-border/60" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border/40 mt-1">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-7 w-32 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-12 w-full rounded-2xl mt-1" />

      <div className="flex justify-center">
        <Skeleton className="h-3 w-40 rounded-md" />
      </div>
    </div>
  );
}
