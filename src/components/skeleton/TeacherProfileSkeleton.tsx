import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export function TeacherProfileSkeleton() {
  return (
    <div className="relative min-h-screen pb-20">
      <div
        className="absolute top-0 inset-x-0 h-112.5 overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-linear-to-b from-primary/15 via-brand-accent/5 to-background dark:from-primary/10 dark:via-brand-accent/5 dark:to-background" />
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute top-20 -left-40 h-100 w-100 rounded-full bg-brand-cyan/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="relative max-w-5xl mx-auto mt-12 sm:mt-16 mb-16">
          <div className="rounded-[2.5rem] border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10 text-center flex flex-col items-center">
            <div className="relative -mt-24 sm:-mt-28 mb-6">
              <Skeleton className="h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem] rotate-3 border-4 border-card/80 shadow-2xl ring-4 ring-primary/10" />
            </div>

            <Skeleton className="h-7 w-28 rounded-full mb-4" />

            <Skeleton className="h-10 sm:h-12 w-64 sm:w-80 rounded-xl mb-4" />

            <div className="w-full max-w-3xl space-y-2 mb-8">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 mx-auto rounded-md" />
              <Skeleton className="h-4 w-10/12 mx-auto rounded-md" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-xl" />
              ))}
            </div>

            <hr className="w-full border-dashed border-border/60 mb-8" />

            <div className="grid grid-cols-2 gap-4 sm:gap-12 w-full max-w-lg">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-9 w-16 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent shadow-xs">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <Skeleton className="h-9 w-72 sm:w-96 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <TeacherCourseCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TeacherCourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card">
      <Skeleton className="aspect-16/10 w-full rounded-none" />

      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-10 rounded-md" />
        </div>

        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-5/6 rounded-md" />

        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>

        <div className="mt-2 pt-4 flex items-center justify-between border-t border-dashed border-border/60">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-10 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}
