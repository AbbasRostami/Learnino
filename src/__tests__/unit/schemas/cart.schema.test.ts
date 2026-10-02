import { createMockTranslator } from "@/__tests__/setup/mocks";
import {
  getAddToCartSchema,
  getApplyDiscountSchema,
  getRemoveFromCartSchema,
  getSyncCartSchema,
} from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

// Tests for Add To Cart Schema
describe("getAddToCartSchema", () => {
  const schema = getAddToCartSchema(t);

  it("should pass with a valid UUID courseId", () => {
    const result = schema.safeParse({
      courseId: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when courseId is not a UUID", () => {
    const result = schema.safeParse({ courseId: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  it("should fail when courseId is missing", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when courseId is an empty string", () => {
    const result = schema.safeParse({ courseId: "" });
    expect(result.success).toBe(false);
  });
});

// Tests for Remove From Cart Schema

describe("getRemoveFromCartSchema", () => {
  const schema = getRemoveFromCartSchema(t);

  it("should pass with a valid UUID courseId", () => {
    const result = schema.safeParse({
      courseId: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  it("should fail with an invalid UUID", () => {
    const result = schema.safeParse({ courseId: "abc-123" });
    expect(result.success).toBe(false);
  });
});

// Tests for Apply Discount Schema

describe("getApplyDiscountSchema", () => {
  const schema = getApplyDiscountSchema(t);

  it("should pass with a valid uppercase discount code", () => {
    const result = schema.safeParse({ code: "WELCOME20" });
    expect(result.success).toBe(true);
  });

  it("should transform lowercase code to uppercase", () => {
    const result = schema.safeParse({ code: "welcome20" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe("WELCOME20");
    }
  });

  it("should trim whitespace from code", () => {
    const result = schema.safeParse({ code: "  WELCOME20  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe("WELCOME20");
    }
  });

  it("should accept codes with underscores and hyphens", () => {
    const result1 = schema.safeParse({ code: "SUMMER_2024" });
    const result2 = schema.safeParse({ code: "NEW-USER" });
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });

  it("should fail when code is shorter than 3 characters", () => {
    const result = schema.safeParse({ code: "AB" });
    expect(result.success).toBe(false);
  });

  it("should fail when code is longer than 50 characters", () => {
    const result = schema.safeParse({ code: "A".repeat(51) });
    expect(result.success).toBe(false);
  });

  it("should fail when code contains special characters", () => {
    const result = schema.safeParse({ code: "CODE@2024!" });
    expect(result.success).toBe(false);
  });

  it("should fail when code contains spaces in the middle", () => {
    const result = schema.safeParse({ code: "CODE 2024" });
    expect(result.success).toBe(false);
  });
});

// Tests for Sync Cart Schema (merging guest cart with user cart)

describe("getSyncCartSchema", () => {
  const schema = getSyncCartSchema(t);

  it("should pass with an array of valid UUIDs", () => {
    const result = schema.safeParse({
      courseIds: [
        "550e8400-e29b-41d4-a716-446655440000",
        "550e8400-e29b-41d4-a716-446655440001",
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should fail when array is empty", () => {
    const result = schema.safeParse({ courseIds: [] });
    expect(result.success).toBe(false);
  });

  it("should fail when array contains more than 50 items", () => {
    const uuids = Array(51).fill("550e8400-e29b-41d4-a716-446655440000");
    const result = schema.safeParse({ courseIds: uuids });
    expect(result.success).toBe(false);
  });

  it("should fail when array contains invalid UUID", () => {
    const result = schema.safeParse({
      courseIds: ["550e8400-e29b-41d4-a716-446655440000", "invalid-uuid"],
    });
    expect(result.success).toBe(false);
  });
});
