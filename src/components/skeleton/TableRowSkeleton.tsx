import { Skeleton } from "@/components/ui/skeleton";

interface TableRowSkeletonProps {
  columns?: number;
  rows?: number;
}

export function TableRowSkeleton({
  columns = 5,
  rows = 8,
}: TableRowSkeletonProps) {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <div
        className="grid gap-4 px-4 py-3 rounded-xl bg-muted/40"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-24 rounded" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="grid gap-4 px-4 py-4 rounded-xl border border-border/40 bg-card/40"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={colIdx} className="h-5 w-full rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}
