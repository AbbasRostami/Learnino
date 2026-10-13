import type {
  ApiSuccessResponse,
  Pagination,
  PaginationParams,
} from "../common";
import type {
  ReactionSummary,
  UserReactionType,
} from "../reaction/reaction.types";

export const COMMENT_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];

export type CommentUser = {
  id: string;
  name: string;
  avatar: string | null;
};

export type CommentStats = {
  replies: number;
  reactions: number;
};

export type CommentReactions = ReactionSummary & {
  myReaction: UserReactionType;
};

export type TargetEntityRef = {
  id: string;
  title: string;
  slug: string;
};

export type CommentTreeItem = {
  id: string;
  content: string;
  status: CommentStatus;
  userId: string;
  courseId: string | null;
  postId: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  stats: CommentStats;
  reactions: CommentReactions;
  replies: CommentTreeItem[];
};

export type FlatCommentItem = {
  id: string;
  content: string;
  status: CommentStatus;
  userId: string;
  courseId: string | null;
  postId: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  parent?: {
    id: string;
    content: string;
  } | null;
  course: TargetEntityRef | null;
  post: TargetEntityRef | null;
  stats: CommentStats;
};

export type GetCourseCommentsParams = PaginationParams;
export type GetPostCommentsParams = PaginationParams;

export type GetMyCommentsParams = PaginationParams & {
  status?: CommentStatus;
};

export type GetAdminCommentsParams = PaginationParams & {
  status?: CommentStatus;
  search?: string;
};

export type CreateCommentPayload = {
  content: string;
  courseId?: string;
  postId?: string;
  parentId?: string;
};

export type CreateCommentResponse = ApiSuccessResponse<{
  message: string;
}>;

export type GetCourseCommentsResponse = ApiSuccessResponse<{
  course: TargetEntityRef;
  items: CommentTreeItem[];
  pagination: Pagination;
}>;

export type GetPostCommentsResponse = ApiSuccessResponse<{
  post: TargetEntityRef;
  items: CommentTreeItem[];
  pagination: Pagination;
}>;

export type GetMyCommentsResponse = ApiSuccessResponse<{
  items: FlatCommentItem[];
  pagination: Pagination;
}>;

export type GetAdminCommentsResponse = ApiSuccessResponse<{
  items: FlatCommentItem[];
  pagination: Pagination;
}>;

export type ApproveCommentResponse = ApiSuccessResponse<{
  message: string;
}>;

export type RejectCommentResponse = ApiSuccessResponse<{
  message: string;
}>;

export type DeleteCommentResponse = ApiSuccessResponse<{
  message: string;
}>;
