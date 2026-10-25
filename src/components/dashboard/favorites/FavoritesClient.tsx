"use client";

import { DashboardPagination } from "@/components/dashboard/shared/DashboardPagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useMyFavoriteCourses,
  useMyFavoritePosts,
  useToggleCourseFavorite,
  useTogglePostFavorite,
} from "@/services";
import { BookOpen, FileText, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FavoriteCourseCard } from "./FavoriteCourseCard";
import { FavoritePostCard } from "./FavoritePostCard";
import { FavoritesCardSkeleton } from "./FavoritesCardSkeleton";

export function FavoritesClient() {
  const t = useTranslations("dashboard");
  const tFav = useTranslations("favorite");

  const [coursesPage, setCoursesPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);

  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isFetching: isCoursesFetching,
  } = useMyFavoriteCourses({ page: coursesPage, limit: 6 });

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
  } = useMyFavoritePosts({ page: postsPage, limit: 6 });

  const { mutate: toggleCourseFav, isPending: isTogglingCourse } =
    useToggleCourseFavorite({});
  const { mutate: togglePostFav, isPending: isTogglingPost } =
    useTogglePostFavorite({});

  const favoriteCourses = coursesData?.data?.items ?? [];
  const coursesPagination = coursesData?.data?.pagination;
  const coursesTotalPages = coursesPagination
    ? Math.ceil(coursesPagination.total / coursesPagination.limit)
    : 1;

  const favoritePosts = postsData?.data?.items ?? [];
  const postsPagination = postsData?.data?.pagination;
  const postsTotalPages = postsPagination
    ? Math.ceil(postsPagination.total / postsPagination.limit)
    : 1;

  const coursesCountReady =
    !isCoursesLoading && coursesPagination !== undefined;
  const postsCountReady = !isPostsLoading && postsPagination !== undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
          <Heart className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">
            {t("menu.favorites")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {tFav("subtitle")}
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <div className="flex justify-center sm:justify-start mb-8">
          <TabsList>
            <TabsTrigger value="courses" className="cursor-pointer">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>{tFav("tabCourses")}</span>
              {coursesCountReady ? (
                <span className="bg-background  cursor-pointer px-2 py-0.5 rounded-full text-xs shadow-sm ml-1 rtl:mr-1">
                  {coursesPagination?.total ?? 0}
                </span>
              ) : (
                <Skeleton className="h-4 w-5 rounded-full ml-1 rtl:mr-1" />
              )}
            </TabsTrigger>

            <TabsTrigger value="posts" className="cursor-pointer">
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{tFav("tabPosts")}</span>
              {postsCountReady ? (
                <span className="bg-background cursor-pointer px-2 py-0.5 rounded-full text-xs shadow-sm ml-1 rtl:mr-1">
                  {postsPagination?.total ?? 0}
                </span>
              ) : (
                <Skeleton className="h-4 w-5 rounded-full ml-1 rtl:mr-1" />
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="mt-0">
          {isCoursesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <FavoritesCardSkeleton key={i} />
              ))}
            </div>
          ) : favoriteCourses?.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border/60 rounded-3xl text-xs text-muted-foreground font-bold bg-card/40">
              {tFav("emptyCourses")}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteCourses?.map((item, idx) => (
                  <FavoriteCourseCard
                    key={item?.id}
                    courseData={item?.course}
                    onRemove={() => toggleCourseFav(item?.course?.id)}
                    isRemoving={isTogglingCourse}
                    index={idx}
                  />
                ))}
              </div>

              <DashboardPagination
                currentPage={coursesPage}
                totalPages={coursesTotalPages}
                onPageChange={setCoursesPage}
                isLoading={isCoursesFetching}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="posts" className="mt-0">
          {isPostsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <FavoritesCardSkeleton key={i} />
              ))}
            </div>
          ) : favoritePosts?.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border/60 rounded-3xl text-xs text-muted-foreground font-bold bg-card/40">
              {tFav("emptyPosts")}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoritePosts?.map((item, idx) => (
                  <FavoritePostCard
                    key={item?.id}
                    postData={item?.post}
                    onRemove={() => togglePostFav(item?.post?.id)}
                    isRemoving={isTogglingPost}
                    index={idx}
                  />
                ))}
              </div>

              <DashboardPagination
                currentPage={postsPage}
                totalPages={postsTotalPages}
                onPageChange={setPostsPage}
                isLoading={isPostsFetching}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
