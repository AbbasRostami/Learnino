import type {
  ApiSuccessResponse,
  Pagination,
  PaginationParams,
} from "../common";
import type { CourseLevel } from "../course/course.types";

export type EnrollmentCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type EnrollmentTeacherRef = {
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
};

export type EnrollmentCourseStats = {
  enrollments: number;
  comments: number;
};

export type EnrollmentCourseCompact = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  price: number;
};

export type EnrollmentCourse = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  price: number;
  level: CourseLevel;
  published: boolean;
  category: EnrollmentCategoryRef;
  teacher?: EnrollmentTeacherRef | null;
  description?: string;
  createdAt?: string;
  stats: EnrollmentCourseStats;
};

export type Enrollment = {
  id: string;
  pricePaid: number;
  createdAt: string;
  course: EnrollmentCourseCompact;
};

export type MyEnrolledCourseItem = {
  id: string;
  pricePaid: number;
  enrolledAt: string;
  course: EnrollmentCourse;
};

export type GetMyEnrolledCoursesParams = PaginationParams;

export type EnrollFreeCourseResponse = ApiSuccessResponse<{
  enrollment: Enrollment;
  message: string;
}>;

export type GetMyEnrolledCoursesResponse = ApiSuccessResponse<{
  items: MyEnrolledCourseItem[];
  pagination: Pagination;
}>;
