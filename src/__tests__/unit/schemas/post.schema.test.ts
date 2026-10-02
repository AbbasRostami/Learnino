import {
  createMockFile,
  createMockTranslator,
  INVALID_UUID,
  MAX_IMAGE_SIZE,
  VALID_UUID,
} from "@/__tests__/setup/mocks";
import { getCreatePostSchema, getUpdatePostSchema } from "@/schemas";
import { describe, expect, it } from "vitest";

const t = createMockTranslator();

const createHtmlContent = (plainTextLength: number): string => {
  const text = "a".repeat(plainTextLength);
  return `<p>${text}</p>`;
};

const createValidPostData = (overrides = {}) => ({
  titleFa: "آموزش تایپ‌اسکریپت",
  titleEn: "TypeScript Tutorial",
  contentFa: createHtmlContent(50),
  contentEn: createHtmlContent(50),
  categoryId: VALID_UUID,
  published: false,
  ...overrides,
});

describe("getCreatePostSchema", () => {
  const schema = getCreatePostSchema(t);

  it("should pass validation with all valid required fields", () => {
    const result = schema.safeParse(createValidPostData());
    expect(result.success).toBe(true);
  });

  it("should default published to false when not provided", () => {
    const { published, ...data } = createValidPostData();
    const result = schema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.published).toBe(false);
    }
  });

  it("should accept content with complex HTML tags as long as stripped text is >= 10 chars", () => {
    const complexHtml =
      '<h2>Title</h2><p>This is a <strong>long enough</strong> paragraph with <em>formatting</em> and <a href="#">links</a>.</p>';
    const result = schema.safeParse(
      createValidPostData({ contentFa: complexHtml, contentEn: complexHtml }),
    );
    expect(result.success).toBe(true);
  });

  it("should handle content with &nbsp; entities correctly", () => {
    const contentWithNbsp =
      "<p>Hello&nbsp;&nbsp;&nbsp;&nbsp;World&nbsp;Test</p>";
    const result = schema.safeParse(
      createValidPostData({
        contentFa: contentWithNbsp,
        contentEn: contentWithNbsp,
      }),
    );
    expect(result.success).toBe(true);
  });

  it("should fail when Persian title is shorter than 3 characters", () => {
    const result = schema.safeParse(createValidPostData({ titleFa: "ab" }));
    expect(result.success).toBe(false);
  });

  it("should fail when Persian title exceeds 200 characters", () => {
    const result = schema.safeParse(
      createValidPostData({ titleFa: "a".repeat(201) }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when English title is shorter than 3 characters", () => {
    const result = schema.safeParse(createValidPostData({ titleEn: "ab" }));
    expect(result.success).toBe(false);
  });

  it("should fail when English title exceeds 200 characters", () => {
    const result = schema.safeParse(
      createValidPostData({ titleEn: "a".repeat(201) }),
    );
    expect(result.success).toBe(false);
  });

  it("should trim whitespace from titles", () => {
    const result = schema.safeParse(
      createValidPostData({
        titleFa: "  عنوان  ",
        titleEn: "  Title  ",
      }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.titleFa).toBe("عنوان");
      expect(result.data.titleEn).toBe("Title");
    }
  });

  it("should fail when Persian content stripped of HTML is less than 10 characters", () => {
    const shortContent = "<p><strong>hi</strong></p>"; // stripped = "hi" (2 chars)
    const result = schema.safeParse(
      createValidPostData({ contentFa: shortContent }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when English content stripped of HTML is less than 10 characters", () => {
    const shortContent = "<p>short</p>";
    const result = schema.safeParse(
      createValidPostData({ contentEn: shortContent }),
    );
    expect(result.success).toBe(false);
  });

  it("should pass when stripped content is exactly 10 characters", () => {
    const exactContent = "<p>0123456789</p>";
    const result = schema.safeParse(
      createValidPostData({ contentFa: exactContent, contentEn: exactContent }),
    );
    expect(result.success).toBe(true);
  });

  it("should fail when content is only HTML tags with no text", () => {
    const emptyContent = "<p></p><div><span></span></div>";
    const result = schema.safeParse(
      createValidPostData({ contentFa: emptyContent }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when content exceeds 100,000 characters", () => {
    const hugeContent = "a".repeat(100_001);
    const result = schema.safeParse(
      createValidPostData({ contentFa: hugeContent }),
    );
    expect(result.success).toBe(false);
  });

  it("should pass when content is exactly 100,000 characters", () => {
    const maxContent = "a".repeat(100_000);
    const result = schema.safeParse(
      createValidPostData({ contentFa: maxContent, contentEn: maxContent }),
    );
    expect(result.success).toBe(true);
  });

  it("should fail when categoryId is not a valid UUID", () => {
    const result = schema.safeParse(
      createValidPostData({ categoryId: INVALID_UUID }),
    );
    expect(result.success).toBe(false);
  });

  it("should fail when categoryId is missing", () => {
    const { categoryId, ...data } = createValidPostData();
    const result = schema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should pass with a valid image file", () => {
    const file = createMockFile("post-cover.jpg", 1024 * 1024, "image/jpeg");
    const result = schema.safeParse(createValidPostData({ image: file }));
    expect(result.success).toBe(true);
  });

  it("should pass with image set to null", () => {
    const result = schema.safeParse(createValidPostData({ image: null }));
    expect(result.success).toBe(true);
  });

  it("should fail when image exceeds 5MB", () => {
    const file = createMockFile("huge.png", MAX_IMAGE_SIZE + 1, "image/png");
    const result = schema.safeParse(createValidPostData({ image: file }));
    expect(result.success).toBe(false);
  });

  it("should fail when image type is not allowed", () => {
    const file = createMockFile("doc.pdf", 1024, "application/pdf");
    const result = schema.safeParse(createValidPostData({ image: file }));
    expect(result.success).toBe(false);
  });

  it("should accept all valid image types", () => {
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].forEach((type) => {
      const file = createMockFile(`test.${type.split("/")[1]}`, 1024, type);
      const result = schema.safeParse(createValidPostData({ image: file }));
      expect(result.success).toBe(true);
    });
  });
});

describe("getUpdatePostSchema", () => {
  const schema = getUpdatePostSchema(t);

  it("should pass when only titleFa is provided", () => {
    const result = schema.safeParse({ titleFa: "عنوان جدید مقاله" });
    expect(result.success).toBe(true);
  });

  it("should pass when only published is provided", () => {
    const result = schema.safeParse({ published: true });
    expect(result.success).toBe(true);
  });

  it("should pass when only categoryId is provided", () => {
    const result = schema.safeParse({ categoryId: VALID_UUID });
    expect(result.success).toBe(true);
  });

  it("should pass when only image file is provided", () => {
    const file = createMockFile("new.jpg", 2048, "image/jpeg");
    const result = schema.safeParse({ image: file });
    expect(result.success).toBe(true);
  });

  it("should fail when no fields are provided (empty object)", () => {
    const result = schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("should fail when all fields are null, undefined, or empty string", () => {
    const result = schema.safeParse({
      titleFa: "",
      titleEn: "",
      contentFa: "",
      contentEn: "",
      categoryId: undefined,
      published: undefined,
      image: null,
    });
    expect(result.success).toBe(false);
  });

  it("should pass when contentFa is empty string (not being updated)", () => {
    const result = schema.safeParse({ titleFa: "عنوان جدید", contentFa: "" });
    expect(result.success).toBe(true);
  });

  it("should fail when contentFa is provided but stripped text is less than 10 chars", () => {
    const result = schema.safeParse({
      titleFa: "عنوان جدید",
      contentFa: "<p>hi</p>",
    });
    expect(result.success).toBe(false);
  });

  it("should pass when contentFa has enough stripped text", () => {
    const result = schema.safeParse({
      titleFa: "عنوان جدید",
      contentFa: createHtmlContent(20),
    });
    expect(result.success).toBe(true);
  });

  it("should fail when titleFa is provided but shorter than 3 characters", () => {
    const result = schema.safeParse({ titleFa: "ab" });
    expect(result.success).toBe(false);
  });

  it("should pass when titleFa is empty string (skip min check)", () => {
    const result = schema.safeParse({ titleFa: "", published: true });
    expect(result.success).toBe(true);
  });

  it("should fail when image exceeds 5MB", () => {
    const file = createMockFile("big.jpg", MAX_IMAGE_SIZE + 1, "image/jpeg");
    const result = schema.safeParse({ image: file });
    expect(result.success).toBe(false);
  });
});
