import { createMockTranslator } from "@/__tests__/setup/mocks";
import {
  getAdminOrdersQuerySchema,
  getMyOrdersQuerySchema,
  getOrderUuidSchema,
} from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

describe("getOrderUuidSchema", () => {
  const schema = getOrderUuidSchema(t);

  it("should pass with a valid UUID", () => {
    const result = schema.safeParse({
      id: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  it("should fail with an invalid UUID format", () => {
    const result = schema.safeParse({ id: "invalid-id" });
    expect(result.success).toBe(false);
  });

  it("should fail when id is missing", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when id is empty string", () => {
    const result = schema.safeParse({ id: "" });
    expect(result.success).toBe(false);
  });
});

describe("getMyOrdersQuerySchema", () => {
  const schema = getMyOrdersQuerySchema();

  it("should pass with empty object (all fields optional)", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should coerce string page to integer", () => {
    const result = schema.safeParse({ page: "3" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
    }
  });

  it("should accept all valid order status values", () => {
    ["PENDING", "PAID", "CANCELLED"].forEach((status) => {
      const result = schema.safeParse({ status });
      expect(result.success).toBe(true);
    });
  });

  it("should fail with invalid status value", () => {
    const result = schema.safeParse({ status: "REFUNDED" });
    expect(result.success).toBe(false);
  });

  it("should fail when page is zero", () => {
    const result = schema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
  });

  it("should fail when limit exceeds maximum (100)", () => {
    const result = schema.safeParse({ limit: 200 });
    expect(result.success).toBe(false);
  });
});

describe("getAdminOrdersQuerySchema", () => {
  const schema = getAdminOrdersQuerySchema(t);

  it("should pass with valid search and pagination", () => {
    const result = schema.safeParse({
      page: 1,
      limit: 10,
      search: "ali@example.com",
      status: "PAID",
    });
    expect(result.success).toBe(true);
  });

  it("should trim search string", () => {
    const result = schema.safeParse({ search: "  ali  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.search).toBe("ali");
    }
  });

  it("should fail when search exceeds 100 characters", () => {
    const result = schema.safeParse({ search: "a".repeat(101) });
    expect(result.success).toBe(false);
  });
});
