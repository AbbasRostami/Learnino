import { CommentsSection } from "@/components/blog/detail/comments/CommentsSection";
import { usePostComments } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockComments = [
  {
    id: "c-1",
    content: "این یک کامنت عالی است",
    createdAt: new Date().toISOString(),
    user: { name: "علی رضایی", avatar: null },
    reactions: { likes: 5, dislikes: 0, myReaction: null },
    replies: [],
  },
];

describe("CommentsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show login prompt when user is not authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue(false as any);
    vi.mocked(usePostComments).mockReturnValue({
      data: { data: { items: [], pagination: { total: 0, limit: 10 } } },
      isLoading: false,
    } as any);

    render(<CommentsSection postSlug="react-course" postId="p-1" />);

    expect(screen.getByText("loginToComment")).toBeInTheDocument();
    expect(screen.getByText(/ورود به حساب/)).toBeInTheDocument();
  });

  it("should show comment form when user is authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue(true as any);
    vi.mocked(usePostComments).mockReturnValue({
      data: { data: { items: [], pagination: { total: 0, limit: 10 } } },
      isLoading: false,
    } as any);

    render(<CommentsSection postSlug="react-course" postId="p-1" />);

    expect(screen.getByPlaceholderText("writeComment")).toBeInTheDocument();
  });

  it("should render comments list when data is available", () => {
    vi.mocked(useAuthStore).mockReturnValue(true as any);
    vi.mocked(usePostComments).mockReturnValue({
      data: {
        data: { items: mockComments, pagination: { total: 1, limit: 10 } },
      },
      isLoading: false,
    } as any);

    render(<CommentsSection postSlug="react-course" postId="p-1" />);

    expect(screen.getByText("این یک کامنت عالی است")).toBeInTheDocument();
    expect(screen.getByText("علی رضایی")).toBeInTheDocument();
  });

  it("should show 'noComments' text when comments array is empty", () => {
    vi.mocked(useAuthStore).mockReturnValue(true as any);
    vi.mocked(usePostComments).mockReturnValue({
      data: { data: { items: [], pagination: { total: 0, limit: 10 } } },
      isLoading: false,
    } as any);

    render(<CommentsSection postSlug="react-course" postId="p-1" />);

    expect(screen.getByText("noComments")).toBeInTheDocument();
  });
});