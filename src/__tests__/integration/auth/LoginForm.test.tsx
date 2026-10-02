import LoginForm from "@/components/auth/login/LoginForm";
import { useLogin } from "@/services";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("LoginForm", () => {
  it("should render email field, password field, and submit button", () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText("example@email.com"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByText("submitLogin")).toBeInTheDocument();
  });

  it("should render link to register page", () => {
    render(<LoginForm />);

    expect(screen.getByText("register")).toBeInTheDocument();
  });

  it("should render link to forgot password page", () => {
    render(<LoginForm />);

    expect(screen.getByText("forgotPassword")).toBeInTheDocument();
  });

  it("should show email validation error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitBtn = screen.getByText("submitLogin");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("validation.emailRequired")).toBeInTheDocument();
    });
  });

  it("should show email format error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("example@email.com");
    await user.type(emailInput, "not-an-email");

    const submitBtn = screen.getByText("submitLogin");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("validation.emailInvalid")).toBeInTheDocument();
    });
  });

  it("should show password required error when password is empty", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("example@email.com");
    await user.type(emailInput, "user@example.com");

    const submitBtn = screen.getByText("submitLogin");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("validation.passwordRequired"),
      ).toBeInTheDocument();
    });
  });

  it("should toggle password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(
      "••••••••",
    ) as HTMLInputElement;
    expect(passwordInput.type).toBe("password");

    const toggleBtn = screen.getByLabelText("Show password");
    await user.click(toggleBtn);

    expect(passwordInput.type).toBe("text");
  });

  it("should call login mutation with correct data on valid submission", async () => {
    const mockMutate = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText("example@email.com"),
      "user@example.com",
    );
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByText("submitLogin"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("should disable form fields when login is pending", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    } as any);

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("example@email.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it("should show loading spinner when login is pending", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    } as any);

    const { container } = render(<LoginForm />);

    expect(screen.getByText("sending")).toBeInTheDocument();
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
