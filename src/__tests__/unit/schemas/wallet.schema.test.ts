import { createMockTranslator } from "@/__tests__/setup/mocks";
import {
  getAdminTransactionsQuerySchema,
  getAdminWalletsQuerySchema,
  getChargeWalletSchema,
  getTransactionsQuerySchema,
} from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

// Tests for Charge Wallet Schema

describe("getChargeWalletSchema", () => {
  const schema = getChargeWalletSchema(t);

  it("should pass with valid amount within range", () => {
    const result = schema.safeParse({ amount: 100000 });
    expect(result.success).toBe(true);
  });

  it("should coerce string number to number", () => {
    const result = schema.safeParse({ amount: "50000" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(50000);
    }
  });

  it("should accept the minimum allowed amount (1,000)", () => {
    const result = schema.safeParse({ amount: 1000 });
    expect(result.success).toBe(true);
  });

  it("should accept the maximum allowed amount (50,000,000)", () => {
    const result = schema.safeParse({ amount: 50_000_000 });
    expect(result.success).toBe(true);
  });

  it("should fail when amount is below minimum (1,000)", () => {
    const result = schema.safeParse({ amount: 999 });
    expect(result.success).toBe(false);
  });

  it("should fail when amount exceeds maximum (50,000,000)", () => {
    const result = schema.safeParse({ amount: 50_000_001 });
    expect(result.success).toBe(false);
  });

  it("should fail when amount is a decimal number", () => {
    const result = schema.safeParse({ amount: 1000.5 });
    expect(result.success).toBe(false);
  });

  it("should fail when amount is zero", () => {
    const result = schema.safeParse({ amount: 0 });
    expect(result.success).toBe(false);
  });

  it("should fail when amount is negative", () => {
    const result = schema.safeParse({ amount: -1000 });
    expect(result.success).toBe(false);
  });

  it("should fail when amount is missing", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when amount is not a valid number string", () => {
    const result = schema.safeParse({ amount: "abc" });
    expect(result.success).toBe(false);
  });
});

// Tests for Transactions Query Schema (User)

describe("getTransactionsQuerySchema", () => {
  const schema = getTransactionsQuerySchema();

  it("should pass with valid pagination and filters", () => {
    const result = schema.safeParse({
      page: 1,
      limit: 10,
      status: "SUCCESS",
      type: "CHARGE",
    });
    expect(result.success).toBe(true);
  });

  it("should pass with empty object (all optional)", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should coerce string page to number", () => {
    const result = schema.safeParse({ page: "2" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
    }
  });

  it("should fail when status is invalid enum value", () => {
    const result = schema.safeParse({ status: "INVALID_STATUS" });
    expect(result.success).toBe(false);
  });

  it("should fail when type is invalid enum value", () => {
    const result = schema.safeParse({ type: "INVALID_TYPE" });
    expect(result.success).toBe(false);
  });

  it("should fail when limit exceeds 100", () => {
    const result = schema.safeParse({ limit: 101 });
    expect(result.success).toBe(false);
  });

  it("should accept all valid status enum values", () => {
    ["PENDING", "SUCCESS", "FAILED", "CANCELLED"].forEach((status) => {
      const result = schema.safeParse({ status });
      expect(result.success).toBe(true);
    });
  });

  it("should accept all valid type enum values", () => {
    ["CHARGE", "PURCHASE", "REFUND"].forEach((type) => {
      const result = schema.safeParse({ type });
      expect(result.success).toBe(true);
    });
  });
});

// Tests for Admin Wallets Query Schema

describe("getAdminWalletsQuerySchema", () => {
  const schema = getAdminWalletsQuerySchema(t);

  it("should pass with valid filters", () => {
    const result = schema.safeParse({
      page: 1,
      limit: 20,
      minBalance: 1000,
      maxBalance: 5000000,
      search: "ali",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when search string exceeds 100 characters", () => {
    const result = schema.safeParse({ search: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("should fail when minBalance is negative", () => {
    const result = schema.safeParse({ minBalance: -100 });
    expect(result.success).toBe(false);
  });
});

// Tests for Admin Transactions Query Schema

describe("getAdminTransactionsQuerySchema", () => {
  const schema = getAdminTransactionsQuerySchema(t);

  it("should pass with valid userId UUID", () => {
    const result = schema.safeParse({
      userId: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when userId is not a valid UUID", () => {
    const result = schema.safeParse({ userId: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  it("should pass with valid date range in ISO format", () => {
    const result = schema.safeParse({
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when date is not in ISO format", () => {
    const result = schema.safeParse({ startDate: "2024-01-01" });
    expect(result.success).toBe(false);
  });
});
