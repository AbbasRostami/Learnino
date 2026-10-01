import type { VisibilityFilter } from "../common/filters.types";
import type {
  Pagination,
  PaginationSearchParams,
} from "../common/pagination.types";
import { CourseLevel } from "../course/course.types";

export type TeacherVisibilityFilter = VisibilityFilter;

export type Teacher = {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  avatar?: string | null;
  show: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TeacherListItem = Teacher & {
  coursesCount: number;
};

export type TeacherCourseCategory = {
  id: string;
  name: string;
  slug: string;
};

export type TeacherCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  level: CourseLevel;
  category: TeacherCourseCategory;
  studentsCount: number;
  createdAt: string;
};

export type TeacherWithCourses = Teacher & {
  courses: TeacherCourse[];
};

export type GetTeachersParams = PaginationSearchParams;

export type GetTeachersResponse = {
  status: "success";
  data: {
    items: TeacherListItem[];
    pagination: Pagination;
  };
};

export type GetAdminTeachersParams = PaginationSearchParams & {
  show?: VisibilityFilter;
};

export type GetAdminTeachersResponse = {
  status: "success";
  data: {
    items: TeacherListItem[];
    pagination: Pagination;
  };
};

export type GetTeacherBySlugResponse = {
  status: "success";
  data: {
    teacher: TeacherWithCourses;
  };
};

export type CreateTeacherPayload = {
  nameFa: string;
  nameEn: string;
  bioFa?: string;
  bioEn?: string;
  show?: boolean;
  avatar?: File | null;
};

export type CreateTeacherResponse = {
  status: "success";
  data: {
    message: string;
    teacher: Teacher;
  };
};

export type UpdateTeacherPayload = {
  id: string;
  nameFa?: string;
  nameEn?: string;
  bioFa?: string | null;
  bioEn?: string | null;
  avatar?: File | null;
};

export type UpdateTeacherResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type DeleteTeacherResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type ToggleTeacherVisibilityPayload = {
  id: string;
  show: boolean;
};

export type ToggleTeacherVisibilityResponse = {
  status: "success";
  data: {
    message: string;
  };
};
