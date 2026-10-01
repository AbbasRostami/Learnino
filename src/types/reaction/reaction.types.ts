import type { ApiSuccessResponse } from "../common";

export type ToggleReactionType = "LIKE" | "DISLIKE";

export type UserReactionType = "LIKE" | "DISLIKE" | null;

export type ReactionSummary = {
  likes: number;
  dislikes: number;
};

export type ToggleReactionPayload = {
  id: string;
  type: ToggleReactionType;
};

export type ToggleReactionResponse = ApiSuccessResponse<{
  message: string;
  myReaction: UserReactionType;
  reactions: ReactionSummary;
}>;
