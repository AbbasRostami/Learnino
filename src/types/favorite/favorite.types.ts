import type {
  ApiSuccessResponse,
  Pagination,
  PaginationParams,
} from "../common";
import { CourseLevel } from "../course/course.types";

export type FavoriteCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type FavoriteCourseStats = {
  enrollments: number;
  comments: number;
};

export type FavoritePostStats = {
  comments: number;
};

export type FavoriteCourse = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  price: number;
  level: CourseLevel;
  published: boolean;
  category: FavoriteCategoryRef;
  stats: FavoriteCourseStats;
};

export type FavoriteCourseItem = {
  id: string;
  savedAt: string;
  course: FavoriteCourse;
};

export type FavoritePost = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  published: boolean;
  category: FavoriteCategoryRef;
  stats: FavoritePostStats;
};

export type FavoritePostItem = {
  id: string;
  savedAt: string;
  post: FavoritePost;
};

export type GetFavoriteCoursesParams = PaginationParams;
export type GetFavoritePostsParams = PaginationParams;

export type ToggleCourseFavoriteResponse = ApiSuccessResponse<{
  message: string;
  isFavorite: boolean;
}>;

export type GetFavoriteCoursesResponse = ApiSuccessResponse<{
  items: FavoriteCourseItem[];
  pagination: Pagination;
}>;

export type TogglePostFavoriteResponse = ApiSuccessResponse<{
  message: string;
  isFavorite: boolean;
}>;

export type GetFavoritePostsResponse = ApiSuccessResponse<{
  items: FavoritePostItem[];
  pagination: Pagination;
}>;
