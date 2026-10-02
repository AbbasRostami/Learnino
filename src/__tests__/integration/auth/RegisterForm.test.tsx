import RegisterForm from "@/components/auth/register/RegisterForm";
import { useRegister } from "@/services";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("RegisterForm", () => {
  const defaultProps = {
    onSuccess: vi.fn(),
  };

  // ── Rendering

  it("should render name, email, password fields and submit button", () => {
    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByPlaceholderText("namePlaceholder")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("example@email.com"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByText("submitRegister")).toBeInTheDocument();
  });

  it("should render link to login page", () => {
    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByText("login")).toBeInTheDocument();
  });

  // ── Validation

  it("should show email required error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<RegisterForm {...defaultProps} />);

    await user.click(screen.getByText("submitRegister"));

    await waitFor(() => {
      expect(screen.getByText("validation.emailRequired")).toBeInTheDocument();
    });
  });

  it("should show password min length error for short password", async () => {
    const user = userEvent.setup();
    render(<RegisterForm {...defaultProps} />);

    await user.type(
      screen.getByPlaceholderText("example@email.com"),
      "user@example.com",
    );
    await user.type(screen.getByPlaceholderText("••••••••"), "abc");
    await user.click(screen.getByText("submitRegister"));

    await waitFor(() => {
      expect(screen.getByText("validation.passwordMin")).toBeInTheDocument();
    });
  });

  it("should show invalid email error for bad format", async () => {
    const user = userEvent.setup();
    render(<RegisterForm {...defaultProps} />);

    await user.type(
      screen.getByPlaceholderText("example@email.com"),
      "bad-email",
    );
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByText("submitRegister"));

    await waitFor(() => {
      expect(screen.getByText("validation.emailInvalid")).toBeInTheDocument();
    });
  });

  // ── Submission

  it("should call register mutation with valid data", async () => {
    const mockMutate = vi.fn();
    vi.mocked(useRegister).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);

    const user = userEvent.setup();
    render(<RegisterForm {...defaultProps} />);

    await user.type(screen.getByPlaceholderText("namePlaceholder"), "Ali");
    await user.type(
      screen.getByPlaceholderText("example@email.com"),
      "ali@example.com",
    );
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByText("submitRegister"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  // ── Loading State

  it("should disable all fields when registration is pending", () => {
    vi.mocked(useRegister).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    } as any);

    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByPlaceholderText("namePlaceholder")).toBeDisabled();
    expect(screen.getByPlaceholderText("example@email.com")).toBeDisabled();
    expect(screen.getByPlaceholderText("••••••••")).toBeDisabled();
  });

  it("should show sending text when pending", () => {
    vi.mocked(useRegister).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    } as any);

    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByText("sending")).toBeInTheDocument();
  });
});
