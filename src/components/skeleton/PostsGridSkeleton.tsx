import { PostCardSkeleton } from "./PostCardSkeleton";
import { SectionHeaderSkeleton } from "./SectionHeaderSkeleton";

interface PostsGridSkeletonProps {
  count?: number;
  showHeader?: boolean;
}

export function PostsGridSkeleton({
  count = 3,
  showHeader = true,
}: PostsGridSkeletonProps) {
  return (
    <section aria-hidden="true" className="w-full">
      {showHeader && <SectionHeaderSkeleton />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <PostCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
