import { CourseCardSkeleton } from "./CourseCardSkeleton";
import { SectionHeaderSkeleton } from "./SectionHeaderSkeleton";

interface CoursesGridSkeletonProps {
  count?: number;
  showHeader?: boolean;
}

export function CoursesGridSkeleton({
  count = 8,
  showHeader = true,
}: CoursesGridSkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {showHeader && <SectionHeaderSkeleton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {Array.from({ length: count }).map((_, idx) => (
          <CourseCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
