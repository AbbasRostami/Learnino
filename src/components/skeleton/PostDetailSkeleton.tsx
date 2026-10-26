import { Skeleton } from "@/components/ui/skeleton";

export function PostDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
        <div className="min-w-0">
          <header className="mb-8 space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-full max-w-2xl rounded-xl" />
            <Skeleton className="h-10 w-3/4 max-w-xl rounded-xl" />
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </header>

          <Skeleton className="aspect-video w-full rounded-3xl mb-10" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-4">
          <Skeleton className="h-64 w-full rounded-3xl" />
        </aside>
      </div>
    </div>
  );
}