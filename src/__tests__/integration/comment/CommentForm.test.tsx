import { CommentForm } from "@/components/blog/detail/comments/CommentForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("CommentForm", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isSubmitting: false,
    placeholder: "نظر خود را بنویسید...",
    submitLabel: "ارسال",
  };

  it("should render textarea and submit button", () => {
    render(<CommentForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("نظر خود را بنویسید..."),
    ).toBeInTheDocument();
    expect(screen.getByText("ارسال")).toBeInTheDocument();
  });

  it("should display character count starting at 0", () => {
    render(<CommentForm {...defaultProps} />);

    expect(screen.getByText("0/1000")).toBeInTheDocument();
  });

  it("should use custom placeholder and submit label when provided", () => {
    render(
      <CommentForm
        {...defaultProps}
        placeholder="پاسخ دهید..."
        submitLabel="پاسخ"
      />,
    );

    expect(screen.getByPlaceholderText("پاسخ دهید...")).toBeInTheDocument();
    expect(screen.getByText("پاسخ")).toBeInTheDocument();
  });

  it("should update character count as user types", async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("نظر خود را بنویسید...");
    await user.type(textarea, "سلام");

    expect(screen.getByText("4/1000")).toBeInTheDocument();
  });

  it("should disable submit button when content is less than 2 characters", async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("نظر خود را بنویسید...");
    const submitBtn = screen.getByText("ارسال").closest("button")!;

    expect(submitBtn).toBeDisabled();

    await user.type(textarea, "س");
    expect(submitBtn).toBeDisabled();

    await user.type(textarea, "ل");
    expect(submitBtn).not.toBeDisabled();
  });

  it("should call onSubmit with trimmed content when form is submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CommentForm {...defaultProps} onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText("نظر خود را بنویسید...");
    await user.type(textarea, "  نظر عالی بود  ");
    await user.click(screen.getByText("ارسال"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("نظر عالی بود");
  });

  it("should clear textarea after successful submission", async () => {
    const user = userEvent.setup();
    render(<CommentForm {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(
      "نظر خود را بنویسید...",
    ) as HTMLTextAreaElement;
    await user.type(textarea, "نظر تست");
    await user.click(screen.getByText("ارسال"));

    expect(textarea.value).toBe("");
    expect(screen.getByText("0/1000")).toBeInTheDocument();
  });

  it("should not submit when content is empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CommentForm {...defaultProps} onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText("نظر خود را بنویسید...");
    await user.type(textarea, "{enter}");

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should disable textarea and button when isSubmitting is true", () => {
    render(<CommentForm {...defaultProps} isSubmitting={true} />);

    const textarea = screen.getByPlaceholderText("نظر خود را بنویسید...");
    expect(textarea).toBeDisabled();
  });

  it("should show loading spinner when isSubmitting is true", () => {
    const { container } = render(
      <CommentForm {...defaultProps} isSubmitting={true} />,
    );

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
