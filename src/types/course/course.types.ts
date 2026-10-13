import type {
  ApiSuccessResponse,
  Pagination,
  PaginationSearchParams,
} from "../common";

export type CourseSortBy = "createdAt" | "price" | "titleFa" | "titleEn";

export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export const COURSE_PUBLISHED = ["true", "false"] as const;
export type CoursePublishedFilter = (typeof COURSE_PUBLISHED)[number];

export type ReactionType = "LIKE" | "DISLIKE" | null;

export type CourseCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type CourseTeacherRef = {
  id: string;
  name: string;
  slug: string;
  avatar?: string | null;
};

export type CourseStats = {
  enrollments: number;
  comments: number;
};

export type CourseReactions = {
  likes: number;
  dislikes: number;
  myReaction: ReactionType;
};

export type CourseEnrollment = {
  id: string;
  enrolledAt: string;
} | null;

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  level: CourseLevel;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category: CourseCategoryRef;
  teacher: CourseTeacherRef;
  stats: CourseStats;
  reactions: CourseReactions;
  isEnrolled: boolean;
  isFavorite: boolean;
  titleFa?: string;
  titleEn?: string;
  descriptionFa?: string | null;
  descriptionEn?: string | null;
};

export type CourseDetail = Course & {
  enrollment: CourseEnrollment;
};

export type GetCoursesParams = PaginationSearchParams & {
  categories?: string[];
  level?: CourseLevel;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: CourseSortBy;
  order?: "asc" | "desc";
};

export type GetAdminCoursesParams = GetCoursesParams & {
  published?: CoursePublishedFilter;
};

export type CreateCoursePayload = {
  titleFa: string;
  titleEn: string;
  descriptionFa?: string;
  descriptionEn?: string;
  price: number;
  level?: CourseLevel;
  categoryId: string;
  teacherId: string;
  published?: boolean;
  image?: File | null;
};

export type UpdateCoursePayload = {
  id: string;
  titleFa?: string;
  titleEn?: string;
  descriptionFa?: string | null;
  descriptionEn?: string | null;
  price?: number;
  level?: CourseLevel;
  categoryId?: string;
  teacherId?: string;
  published?: boolean;
  image?: File | null;
};

export type ToggleCoursePublishPayload = {
  id: string;
  published: boolean;
};

export type GetCoursesResponse = ApiSuccessResponse<{
  items: Course[];
  pagination: Pagination;
}>;

export type GetAdminCoursesResponse = ApiSuccessResponse<{
  items: Course[];
  pagination: Pagination;
}>;

export type GetCourseBySlugResponse = ApiSuccessResponse<{
  course: CourseDetail;
}>;

export type CreateCourseResponse = ApiSuccessResponse<{
  message: string;
  course: Course;
}>;

export type UpdateCourseResponse = ApiSuccessResponse<{
  message: string;
}>;

export type DeleteCourseResponse = ApiSuccessResponse<{
  message: string;
}>;

export type ToggleCoursePublishResponse = ApiSuccessResponse<{
  message: string;
}>;
