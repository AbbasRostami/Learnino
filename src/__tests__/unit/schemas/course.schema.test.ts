import {
  createMockFile,
  createMockTranslator,
  INVALID_UUID,
  MAX_IMAGE_SIZE,
  VALID_UUID,
} from "@/__tests__/setup/mocks";
import {
  getAdminCoursesQuerySchema,
  getCourseSlugSchema,
  getCoursesQuerySchema,
  getCourseUuidSchema,
  getCreateCourseSchema,
  getToggleCoursePublishSchema,
  getUpdateCourseSchema,
} from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

const createValidCourseData = (overrides = {}) => ({
  titleFa: "آموزش ری‌اکت پیشرفته",
  titleEn: "Advanced React Course",
  descriptionFa: "توضیحات فارسی دوره",
  descriptionEn: "English course description",
  price: 500000,
  level: "BEGINNER" as const,
  categoryId: VALID_UUID,
  teacherId: VALID_UUID,
  published: false,
  ...overrides,
});

// Tests for Create Course Schema

describe("getCreateCourseSchema", () => {
  const schema = getCreateCourseSchema(t);

  it("should pass validation with all valid required fields", () => {
    const result = schema.safeParse(createValidCourseData());
    expect(result.success).toBe(true);
  });

  it("should pass with price set to zero (free course)", () => {
    const result = schema.safeParse(createValidCourseData({ price: 0 }));
    expect(result.success).toBe(true);
  });

  it("should pass with maximum allowed price (1,000,000,000)", () => {
    const result = schema.safeParse(
      createValidCourseData({ price: 1_000_000_000 }),
    );
    expect(result.success).toBe(true);
  });

  it("should default level to BEGINNER when not provided", () => {
    const { level, ...dataWithoutLevel } = createValidCourseData();
    const result = schema.safeParse(dataWithoutLevel);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.level).toBe("BEGINNER");
    }
  });

  it("should default published to false when not provided", () => {
    const { published, ...dataWithoutPublished } = createValidCourseData();
    const result = schema.safeParse(dataWithoutPublished);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.published).toBe(false);
    }
  });

  it("should accept all valid level enum values", () => {
    ["BEGINNER", "INTERMEDIATE", "ADVANCED"].forEach((level) => {
      const result = schema.safeParse(createValidCourseData({ level }));
      expect(result.success).toBe(true);
    });
  });

  it("should trim whitespace from title fields", () => {
    const result = schema.safeParse(
      createValidCourseData({
        titleFa: "  عنوان فارسی  ",
        titleEn: "  English Title  ",
      }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.titleFa).toBe("عنوان فارسی");
      expect(result.data.titleEn).toBe("English Title");
    }
  });

  it("should accept optional description fields as empty string", () => {
    const result = schema.safeParse(
      createValidCourseData({ descriptionFa: "", descriptionEn: "" }),
    );
    expect(result.success).toBe(true);
  });

  // ── Title Validation ──

  it("should fail when Persian title is shorter than 3 characters", () => {
    const result = schema.safeParse(createValidCourseData({ titleFa: "ab" }));
    expect(result.success).toBe(false);
  });

  it("should fail when Persian title exceeds 150 characters", () => {
    const result = schema.safeParse(
      createValidCourseData({ titleFa: "a".repeat(151) }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when English title is shorter than 3 characters", () => {
    const result = schema.safeParse(createValidCourseData({ titleEn: "ab" }));
    expect(result.success).toBe(false);
  });

  it("should fail when English title exceeds 150 characters", () => {
    const result = schema.safeParse(
      createValidCourseData({ titleEn: "a".repeat(151) }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when Persian title is empty after trimming", () => {
    const result = schema.safeParse(createValidCourseData({ titleFa: "   " }));
    expect(result.success).toBe(false);
  });

  // ── Description Validation ──

  it("should fail when description exceeds 5000 characters", () => {
    const result = schema.safeParse(
      createValidCourseData({ descriptionFa: "a".repeat(5001) }),
    );
    expect(result.success).toBe(false);
  });

  // ── Price Validation ──

  it("should fail when price is negative", () => {
    const result = schema.safeParse(createValidCourseData({ price: -1 }));
    expect(result.success).toBe(false);
  });

  it("should fail when price exceeds maximum (1,000,000,000)", () => {
    const result = schema.safeParse(
      createValidCourseData({ price: 1_000_000_001 }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when price is a decimal number", () => {
    const result = schema.safeParse(createValidCourseData({ price: 99.99 }));
    expect(result.success).toBe(false);
  });

  // ── UUID Validation ──

  it("should fail when categoryId is not a valid UUID", () => {
    const result = schema.safeParse(
      createValidCourseData({ categoryId: INVALID_UUID }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when teacherId is not a valid UUID", () => {
    const result = schema.safeParse(
      createValidCourseData({ teacherId: INVALID_UUID }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when categoryId is empty string", () => {
    const result = schema.safeParse(createValidCourseData({ categoryId: "" }));
    expect(result.success).toBe(false);
  });

  // ── Level Validation ──

  it("should fail when level is an invalid enum value", () => {
    const result = schema.safeParse(createValidCourseData({ level: "EXPERT" }));
    expect(result.success).toBe(false);
  });

  // ── Image Validation ──

  it("should pass with a valid image file under 5MB", () => {
    const file = createMockFile("course.jpg", 1024 * 1024, "image/jpeg");
    const result = schema.safeParse(createValidCourseData({ image: file }));
    expect(result.success).toBe(true);
  });

  it("should pass with image set to null", () => {
    const result = schema.safeParse(createValidCourseData({ image: null }));
    expect(result.success).toBe(true);
  });

  it("should pass with image set to undefined", () => {
    const result = schema.safeParse(
      createValidCourseData({ image: undefined }),
    );
    expect(result.success).toBe(true);
  });

  it("should fail when image exceeds 5MB", () => {
    const file = createMockFile("huge.jpg", MAX_IMAGE_SIZE + 1, "image/jpeg");
    const result = schema.safeParse(createValidCourseData({ image: file }));
    expect(result.success).toBe(false);
  });

  it("should fail when image type is not allowed (e.g. GIF)", () => {
    const file = createMockFile("animation.gif", 1024, "image/gif");
    const result = schema.safeParse(createValidCourseData({ image: file }));
    expect(result.success).toBe(false);
  });

  it("should fail when image type is SVG", () => {
    const file = createMockFile("icon.svg", 1024, "image/svg+xml");
    const result = schema.safeParse(createValidCourseData({ image: file }));
    expect(result.success).toBe(false);
  });

  it("should accept all valid image types (jpeg, jpg, png, webp)", () => {
    const validTypes = [
      { name: "photo.jpeg", type: "image/jpeg" },
      { name: "photo.jpg", type: "image/jpg" },
      { name: "photo.png", type: "image/png" },
      { name: "photo.webp", type: "image/webp" },
    ];

    validTypes.forEach(({ name, type }) => {
      const file = createMockFile(name, 1024, type);
      const result = schema.safeParse(createValidCourseData({ image: file }));
      expect(result.success).toBe(true);
    });
  });
});

// Tests for Update Course Schema

describe("getUpdateCourseSchema", () => {
  const schema = getUpdateCourseSchema(t);

  it("should pass when only titleFa is provided", () => {
    const result = schema.safeParse({ titleFa: "عنوان جدید" });
    expect(result.success).toBe(true);
  });

  it("should pass when only price is provided", () => {
    const result = schema.safeParse({ price: 750000 });
    expect(result.success).toBe(true);
  });

  it("should pass when only published status is provided", () => {
    const result = schema.safeParse({ published: true });
    expect(result.success).toBe(true);
  });

  it("should pass when only level is provided", () => {
    const result = schema.safeParse({ level: "ADVANCED" });
    expect(result.success).toBe(true);
  });

  it("should pass when only image file is provided", () => {
    const file = createMockFile("new-cover.png", 2048, "image/png");
    const result = schema.safeParse({ image: file });
    expect(result.success).toBe(true);
  });

  it("should fail when all fields are empty or undefined (no changes)", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when all string fields are empty strings and no other fields", () => {
    const result = schema.safeParse({
      titleFa: "",
      titleEn: "",
      descriptionFa: "",
      descriptionEn: "",
      categoryId: "",
      teacherId: "",
    });
    expect(result.success).toBe(false);
  });

  // ── superRefine: Title min length when provided ──

  it("should fail when titleFa is provided but shorter than 3 characters", () => {
    const result = schema.safeParse({ titleFa: "ab" });
    expect(result.success).toBe(false);
  });

  it("should fail when titleEn is provided but shorter than 3 characters", () => {
    const result = schema.safeParse({ titleEn: "ab" });
    expect(result.success).toBe(false);
  });

  it("should pass when titleFa is empty string (not provided, so skip min check)", () => {
    const result = schema.safeParse({ titleFa: "", price: 100000 });
    expect(result.success).toBe(true);
  });

  it("should fail when price is negative", () => {
    const result = schema.safeParse({ price: -500 });
    expect(result.success).toBe(false);
  });

  it("should fail when categoryId is invalid UUID", () => {
    const result = schema.safeParse({ categoryId: INVALID_UUID });
    expect(result.success).toBe(false);
  });

  it("should fail when image exceeds 5MB", () => {
    const file = createMockFile("big.jpg", MAX_IMAGE_SIZE + 1, "image/jpeg");
    const result = schema.safeParse({ image: file });
    expect(result.success).toBe(false);
  });
});

// Tests for Toggle Course Publish Schema

describe("getToggleCoursePublishSchema", () => {
  const schema = getToggleCoursePublishSchema(t);

  it("should pass with published set to true", () => {
    const result = schema.safeParse({ published: true });
    expect(result.success).toBe(true);
  });

  it("should pass with published set to false", () => {
    const result = schema.safeParse({ published: false });
    expect(result.success).toBe(true);
  });

  it("should fail when published is missing", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when published is a string instead of boolean", () => {
    const result = schema.safeParse({ published: "true" });
    expect(result.success).toBe(false);
  });
});

// Tests for Courses Query Schema

describe("getCoursesQuerySchema", () => {
  const schema = getCoursesQuerySchema(t);

  it("should pass with empty object (all fields optional with defaults)", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should coerce string page and limit to numbers", () => {
    const result = schema.safeParse({ page: "2", limit: "20" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(2);
      expect(result.data.limit).toBe(20);
    }
  });

  it("should accept valid level filter", () => {
    const result = schema.safeParse({ level: "ADVANCED" });
    expect(result.success).toBe(true);
  });

  it("should fail with invalid level value", () => {
    const result = schema.safeParse({ level: "EXPERT" });
    expect(result.success).toBe(false);
  });

  it("should accept minPrice and maxPrice filters", () => {
    const result = schema.safeParse({ minPrice: 0, maxPrice: 500000 });
    expect(result.success).toBe(true);
  });

  it("should fail when minPrice is negative", () => {
    const result = schema.safeParse({ minPrice: -100 });
    expect(result.success).toBe(false);
  });

  it("should accept valid sortBy values", () => {
    ["createdAt", "price", "titleFa", "titleEn"].forEach((sortBy) => {
      const result = schema.safeParse({ sortBy });
      expect(result.success).toBe(true);
    });
  });

  it("should accept valid order values", () => {
    ["asc", "desc"].forEach((order) => {
      const result = schema.safeParse({ order });
      expect(result.success).toBe(true);
    });
  });

  it("should fail when search exceeds 100 characters", () => {
    const result = schema.safeParse({ search: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("should accept categories as array of strings", () => {
    const result = schema.safeParse({ categories: ["cat-1", "cat-2"] });
    expect(result.success).toBe(true);
  });
});

// Tests for Admin Courses Query Schema

describe("getAdminCoursesQuerySchema", () => {
  const schema = getAdminCoursesQuerySchema(t);

  it("should accept published filter as 'true' or 'false' string", () => {
    expect(schema.safeParse({ published: "true" }).success).toBe(true);
    expect(schema.safeParse({ published: "false" }).success).toBe(true);
  });

  it("should fail when published is not 'true' or 'false'", () => {
    const result = schema.safeParse({ published: "yes" });
    expect(result.success).toBe(false);
  });

  it("should inherit all base query validations", () => {
    const result = schema.safeParse({
      page: 1,
      limit: 10,
      level: "BEGINNER",
      search: "react",
      published: "true",
    });
    expect(result.success).toBe(true);
  });
});

// Tests for Course UUID Schema

describe("getCourseUuidSchema", () => {
  const schema = getCourseUuidSchema(t);

  it("should pass with a valid UUID", () => {
    const result = schema.safeParse({ id: VALID_UUID });
    expect(result.success).toBe(true);
  });

  it("should fail with an invalid UUID", () => {
    const result = schema.safeParse({ id: INVALID_UUID });
    expect(result.success).toBe(false);
  });

  it("should fail when id is missing", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// Tests for Course Slug Schema

describe("getCourseSlugSchema", () => {
  const schema = getCourseSlugSchema(t);

  it("should pass with a valid slug", () => {
    const result = schema.safeParse({ slug: "advanced-react-course" });
    expect(result.success).toBe(true);
  });

  it("should fail when slug is empty", () => {
    const result = schema.safeParse({ slug: "" });
    expect(result.success).toBe(false);
  });

  it("should fail when slug exceeds 200 characters", () => {
    const result = schema.safeParse({ slug: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("should trim whitespace from slug", () => {
    const result = schema.safeParse({ slug: "  my-course  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.slug).toBe("my-course");
    }
  });
});
