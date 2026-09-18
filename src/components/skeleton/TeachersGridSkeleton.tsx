import { SectionHeaderSkeleton } from "./SectionHeaderSkeleton";
import { TeacherCardSkeleton } from "./TeacherCardSkeleton";

interface TeachersGridSkeletonProps {
  count?: number;
  showHeader?: boolean;
}

export function TeachersGridSkeleton({
  count = 4,
  showHeader = true,
}: TeachersGridSkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {showHeader && <SectionHeaderSkeleton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <TeacherCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
