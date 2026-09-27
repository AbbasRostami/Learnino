import type { VisibilityFilter } from "../common/filters.types";
import type { Pagination, PaginationParams } from "../common/pagination.types";

export type CategoryVisibilityFilter = VisibilityFilter;

export type CategoryCount = {
  courses: number;
  posts: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  show: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryWithCount = Category & {
  _count: CategoryCount;
};

export type GetCategoriesResponse = {
  status: "success";
  data: {
    categories: CategoryWithCount[];
    total: number;
  };
};

export type GetCategoryBySlugResponse = {
  status: "success";
  data: {
    category: CategoryWithCount;
  };
};

export type AdminCategoriesParams = PaginationParams & {
  show?: VisibilityFilter;
  search?: string;
};

export type AdminCategoriesResponse = {
  status: "success";
  data: {
    items: CategoryWithCount[];
    pagination: Pagination;
  };
};

export type CreateCategoryPayload = {
  nameFa: string;
  nameEn: string;
  descriptionFa?: string;
  descriptionEn?: string;
  show?: boolean;
};

export type CreateCategoryResponse = {
  status: "success";
  data: {
    message: string;
    category: Category;
  };
};

export type UpdateCategoryPayload = {
  id: string;
  nameFa?: string;
  nameEn?: string;
  descriptionFa?: string;
  descriptionEn?: string;
};

export type UpdateCategoryResponse = {
  status: "success";
  data: {
    message: string;
    category: Category;
  };
};

export type DeleteCategoryResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type ToggleCategoryVisibilityPayload = {
  id: string;
  show: boolean;
};

export type ToggleCategoryVisibilityResponse = {
  status: "success";
  data: {
    message: string;
  };
};
