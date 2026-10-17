import type {
  ApiSuccessResponse,
  Pagination,
  PaginationSearchParams,
} from "../common";
import type {
  ReactionSummary,
  UserReactionType,
} from "../reaction/reaction.types";

export type PostSortBy = "createdAt" | "title";

export type PostPublishedFilter = "true" | "false";

export type PostCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type PostStats = {
  comments: number;
};

export type PostReactions = ReactionSummary & {
  myReaction: UserReactionType;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;

  titleFa?: string;
  titleEn?: string;
  contentFa?: string;
  contentEn?: string;

  imageUrl?: string | null;

  published: boolean;
  createdAt: string;
  updatedAt: string;
  category: PostCategoryRef | null;
  stats: PostStats;
  reactions: PostReactions;
  isFavorite: boolean;
};

export type GetPostsParams = PaginationSearchParams & {
  category?: string;
  sortBy?: PostSortBy;
  order?: "asc" | "desc";
};

export type GetAdminPostsParams = PaginationSearchParams & {
  published?: PostPublishedFilter;
};

export type CreatePostPayload = {
  titleFa: string;
  titleEn: string;
  contentFa: string;
  contentEn: string;
  categoryId: string;
  published?: boolean;
  image?: File | null;
};

export type UpdatePostPayload = {
  id: string;
  titleFa?: string;
  titleEn?: string;
  contentFa?: string;
  contentEn?: string;
  categoryId?: string;
  published?: boolean;
  image?: File | null;
};

export type TogglePostPublishPayload = {
  id: string;
  published: boolean;
};

export type UploadEditorImagePayload = {
  image: File;
};

export type GetPostsResponse = ApiSuccessResponse<{
  items: Post[];
  pagination: Pagination;
}>;

export type GetAdminPostsResponse = ApiSuccessResponse<{
  items: Post[];
  pagination: Pagination;
}>;

export type GetPostBySlugResponse = ApiSuccessResponse<{
  post: Post;
}>;

export type CreatePostResponse = ApiSuccessResponse<{
  message: string;
  post: Post;
}>;

export type UpdatePostResponse = ApiSuccessResponse<{
  message: string;
}>;

export type DeletePostResponse = ApiSuccessResponse<{
  message: string;
}>;

export type TogglePostPublishResponse = ApiSuccessResponse<{
  message: string;
}>;

export type UploadEditorImageResponse = ApiSuccessResponse<{
  url: string;
}>;
