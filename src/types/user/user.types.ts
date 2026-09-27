import type { SortOrder } from "../common/filters.types";
import type {
  Pagination,
  PaginationParams,
  PaginationSearchParams,
} from "../common/pagination.types";

export type UserRole = "USER" | "ADMIN";

export type SortByUser = "createdAt" | "name" | "email";

export type VerificationFilter = "true" | "false";

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type UserStats = {
  enrollments: number;
  orders: number;
  comments: number;
  favoriteCourses?: number;
  favoritePosts?: number;
  reactions?: number;
};

export type AdminUserListItem = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  stats: UserStats;
};

export type AdminUserDetails = UserProfile & {
  isVerified: boolean;
  walletBalance: number;
  stats: UserStats;
};

export type BannedUser = {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  isBanned: boolean;
  bannedAt: string;
  createdAt: string;
};

export type ProfileOverview = {
  enrollment: {
    total: number;
  };
  order: {
    total: number;
    active: number;
  };
  wallet: {
    balance: number;
  };
  comment: {
    total: number;
    pending: number;
  };
  favorite: {
    courses: number;
    posts: number;
  };
  cart: {
    items: number;
  };
  reaction: {
    total: number;
  };
};

export type ProfileOverviewResponse = {
  status: "success";
  data: {
    overview: ProfileOverview;
  };
};

export type UserProfileResponse = {
  status: "success";
  data: {
    profile: UserProfile;
  };
};

export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  avatar?: File | null;
};

export type UpdateProfileResponse = {
  status: "success";
  data: {
    message: string;
    profile: UserProfile;
  };
};

export type DeleteAvatarResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type ListUsersParams = PaginationSearchParams & {
  role?: UserRole;
  isVerified?: VerificationFilter;
  sortBy?: SortByUser;
  order?: SortOrder;
};

export type ListUsersResponse = {
  status: "success";
  data: {
    items: AdminUserListItem[];
    pagination: Pagination;
  };
};

export type BannedUsersParams = PaginationParams;

export type BannedUsersResponse = {
  status: "success";
  data: {
    items: BannedUser[];
    pagination: Pagination;
  };
};

export type UserDetailsResponse = {
  status: "success";
  data: {
    user: AdminUserDetails;
  };
};

export type BanUserResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type UnbanUserResponse = {
  status: "success";
  data: {
    message: string;
  };
};
