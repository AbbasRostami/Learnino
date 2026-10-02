import { createMockTranslator } from "@/__tests__/setup/mocks";
import {
  getChangePasswordSchema,
  getForgotPasswordSchema,
  getLoginSchema,
  getRegisterSchema,
  getResetPasswordSchema,
  getVerifyEmailSchema,
} from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

// Tests for Login Schema Validation

describe("getLoginSchema", () => {
  const schema = getLoginSchema(t);

  it("should pass validation with a valid email and password", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when email is missing", () => {
    const result = schema.safeParse({ email: "", password: "secret123" });
    expect(result.success).toBe(false);
  });

  it("should fail when email format is invalid", () => {
    const result = schema.safeParse({
      email: "not-an-email",
      password: "secret123",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when password is empty", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("should trim email before validation", () => {
    const result = schema.safeParse({
      email: "  user@example.com  ",
      password: "secret123",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });
});

// Tests for Register Schema Validation

describe("getRegisterSchema", () => {
  const schema = getRegisterSchema(t);

  it("should pass with valid data including optional name", () => {
    const result = schema.safeParse({
      email: "new@example.com",
      password: "password123",
      name: "Ali Rezaei",
    });
    expect(result.success).toBe(true);
  });

  it("should pass without the optional name field", () => {
    const result = schema.safeParse({
      email: "new@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when password is shorter than 6 characters", () => {
    const result = schema.safeParse({
      email: "new@example.com",
      password: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when email format is invalid", () => {
    const result = schema.safeParse({
      email: "invalid",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });
});

// Tests for Verify Email Schema (OTP)

describe("getVerifyEmailSchema", () => {
  const schema = getVerifyEmailSchema(t);

  it("should pass with a valid 6-digit OTP code", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when OTP is not 6 digits", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "123",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when OTP contains letters", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "12ab56",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when OTP is empty", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when OTP is longer than 6 digits", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "1234567",
    });
    expect(result.success).toBe(false);
  });
});

// Tests for Forgot Password Schema

describe("getForgotPasswordSchema", () => {
  const schema = getForgotPasswordSchema(t);

  it("should pass with a valid email", () => {
    const result = schema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("should fail with an invalid email format", () => {
    const result = schema.safeParse({ email: "invalid-email" });
    expect(result.success).toBe(false);
  });
});

// Tests for Reset Password Schema

describe("getResetPasswordSchema", () => {
  const schema = getResetPasswordSchema(t);

  it("should pass with valid email, OTP, and new password", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "123456",
      newPassword: "newpassword123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when new password is too short", () => {
    const result = schema.safeParse({
      email: "user@example.com",
      code: "123456",
      newPassword: "abc",
    });
    expect(result.success).toBe(false);
  });
});

// Tests for Change Password Schema (with refine)

describe("getChangePasswordSchema", () => {
  const schema = getChangePasswordSchema(t);

  it("should pass when new password differs from current password", () => {
    const result = schema.safeParse({
      currentPassword: "oldpass123",
      newPassword: "newpass456",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when new password is same as current password", () => {
    const result = schema.safeParse({
      currentPassword: "samepass123",
      newPassword: "samepass123",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when current password is empty", () => {
    const result = schema.safeParse({
      currentPassword: "",
      newPassword: "newpass123",
    });
    expect(result.success).toBe(false);
  });

  it("should fail when new password is shorter than 6 characters", () => {
    const result = schema.safeParse({
      currentPassword: "oldpass123",
      newPassword: "abc",
    });
    expect(result.success).toBe(false);
  });
});
