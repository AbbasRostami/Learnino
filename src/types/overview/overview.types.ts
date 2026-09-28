import type { ApiSuccessResponse } from "../common";

export type AdminUserStats = {
  total: number;
  verified: number;
  unverified: number;
  admins: number;
  regular: number;
  newThisWeek: number;
  newThisMonth: number;
};

export type AdminCourseStats = {
  total: number;
  published: number;
  unpublished: number;
  totalEnrollments: number;
};

export type AdminOrderStats = {
  total: number;
  pending: number;
  paid: number;
  cancelled: number;
  today: number;
};

export type RevenueTimeframe = {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
};

export type AdminRevenueStats = {
  sales: RevenueTimeframe;
  walletCharges: RevenueTimeframe;
};

export type ExpiringDiscount = {
  id: string;
  code: string;
  type: "PERCENTAGE" | "AMOUNT";
  value: number;
  expiresAt: string;
};

export type TopUsedDiscount = ExpiringDiscount & {
  usedCount: number;
  maxUses: number;
};

export type AdminDiscountStats = {
  total: number;
  active: number;
  expiringThisWeek: ExpiringDiscount[];
  topUsed: TopUsedDiscount[];
};

export type LatestPendingComment = {
  id: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  course: {
    id: string;
    title: string;
    slug: string;
  } | null;
  post: {
    id: string;
    title: string;
    slug: string;
  } | null;
};

export type AdminCommentStats = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  latestPending: LatestPendingComment[];
};

export type AdminPostStats = {
  total: number;
  published: number;
  unpublished: number;
};

export type TopEnrolledCourse = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  enrollments: number;
};

export type AdminEnrollmentStats = {
  total: number;
  thisWeek: number;
  thisMonth: number;
  topCourses: TopEnrolledCourse[];
};

export type GetAdminUsersStatsResponse = ApiSuccessResponse<{
  user: AdminUserStats;
}>;

export type GetAdminCoursesStatsResponse = ApiSuccessResponse<{
  course: AdminCourseStats;
}>;

export type GetAdminOrdersStatsResponse = ApiSuccessResponse<{
  order: AdminOrderStats;
}>;

export type GetAdminRevenueStatsResponse = ApiSuccessResponse<{
  revenue: AdminRevenueStats;
}>;

export type GetAdminDiscountsStatsResponse = ApiSuccessResponse<{
  discount: AdminDiscountStats;
}>;

export type GetAdminCommentsStatsResponse = ApiSuccessResponse<{
  comment: AdminCommentStats;
}>;

export type GetAdminPostsStatsResponse = ApiSuccessResponse<{
  post: AdminPostStats;
}>;

export type GetAdminEnrollmentsStatsResponse = ApiSuccessResponse<{
  enrollment: AdminEnrollmentStats;
}>;

export type GetAdminOverviewResponse = ApiSuccessResponse<{
  user: AdminUserStats;
  course: AdminCourseStats;
  order: AdminOrderStats;
  revenue: AdminRevenueStats;
  discount: AdminDiscountStats;
  comment: AdminCommentStats;
  post: AdminPostStats;
  enrollment: AdminEnrollmentStats;
}>;
