"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface AdminTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
}

export function AdminTableSkeleton({
  columnCount = 5,
  rowCount = 5,
}: AdminTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="border-b-0 hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={colIndex} className="py-4">
              <div className="flex items-center gap-3">
                {colIndex === 0 && (
                  <Skeleton className="h-10 w-10 rounded-xl bg-primary/15 shrink-0" />
                )}
                <div className="flex flex-col gap-1.5 flex-1">
                  <Skeleton
                    className={`h-4 rounded-md bg-muted ${
                      colIndex === 0
                        ? "w-3/4"
                        : colIndex === 1
                          ? "w-1/2"
                          : "w-full"
                    }`}
                  />
                  {colIndex === 0 && (
                    <Skeleton className="h-3 w-1/2 rounded-md bg-muted/50" />
                  )}
                </div>
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
