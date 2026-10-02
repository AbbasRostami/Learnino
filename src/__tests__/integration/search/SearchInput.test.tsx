import { SearchInput } from "@/components/layout/Navbar/SearchInput";
import { useSearch } from "@/services";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSearchResult = {
  courses: [
    {
      id: "course-1",
      title: "دوره جامع React",
      slug: "react-course",
      imageUrl: null,
      category: { name: "فرانت‌اند" },
    },
  ],
  posts: [
    {
      id: "post-1",
      title: "مقاله مقایسه React و Vue",
      slug: "react-vs-vue",
      imageUrl: null,
    },
  ],
};

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input with placeholder", () => {
    vi.mocked(useSearch).mockReturnValue({ data: undefined, isLoading: false } as any);
    render(<SearchInput />);

    expect(screen.getByPlaceholderText("searchPlaceholder")).toBeInTheDocument();
  });

  it("should show dropdown with courses and posts when query length >= 2", async () => {
    vi.mocked(useSearch).mockReturnValue({
      data: { data: mockSearchResult },
      isLoading: false,
    } as any);

    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(input, "React");

    await waitFor(() => {
      expect(screen.getByText("دوره جامع React")).toBeInTheDocument();
      expect(screen.getByText("مقاله مقایسه React و Vue")).toBeInTheDocument();
    });
  });

  it("should show loading spinner while fetching search results", async () => {
    vi.mocked(useSearch).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(input, "React");

    await waitFor(() => {
      expect(screen.getByText("searching")).toBeInTheDocument();
    });
  });

  it("should show 'noResults' message when no items match the query", async () => {
    vi.mocked(useSearch).mockReturnValue({
      data: { data: { courses: [], posts: [] } },
      isLoading: false,
    } as any);

    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByPlaceholderText("searchPlaceholder");
    await user.type(input, "کلمه_ناموجود");

    await waitFor(() => {
      expect(screen.getByText("noResults")).toBeInTheDocument();
    });
  });
});