import { objectToFormData } from "@/utils/formData";
import { describe, expect, it } from "vitest";

describe("objectToFormData", () => {
  it("should return an empty FormData instance for an empty object", () => {
    const result = objectToFormData({});
    expect(result).toBeInstanceOf(FormData);
    expect(Array.from(result.entries())).toHaveLength(0);
  });

  it("should append string values correctly", () => {
    const result = objectToFormData({ name: "Ali", city: "Tehran" });
    expect(result.get("name")).toBe("Ali");
    expect(result.get("city")).toBe("Tehran");
  });

  it("should trim string values", () => {
    const result = objectToFormData({ name: "  Ali  " });
    expect(result.get("name")).toBe("Ali");
  });

  it("should append number values as strings", () => {
    const result = objectToFormData({ age: 25, price: 1000 });
    expect(result.get("age")).toBe("25");
    expect(result.get("price")).toBe("1000");
  });

  it("should skip undefined values", () => {
    const result = objectToFormData({ name: "Ali", city: undefined });
    expect(result.get("name")).toBe("Ali");
    expect(result.get("city")).toBeNull();
  });

  it("should skip null values", () => {
    const result = objectToFormData({ name: "Ali", bio: null });
    expect(result.get("name")).toBe("Ali");
    expect(result.get("bio")).toBeNull();
  });

  it("should skip empty string values", () => {
    const result = objectToFormData({ name: "Ali", email: "" });
    expect(result.get("name")).toBe("Ali");
    expect(result.get("email")).toBeNull();
  });

  it("should append File instances directly without conversion", () => {
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const result = objectToFormData({ avatar: file });

    const appended = result.get("avatar") as File;
    expect(appended).toBeInstanceOf(File);
    expect(appended.name).toBe("test.txt");
  });

  it("should append Blob instances directly", () => {
    const blob = new Blob(["hello"], { type: "text/plain" });
    const result = objectToFormData({ file: blob });

    expect(result.get("file")).toBeInstanceOf(Blob);
  });

  it("should convert boolean true to JSON blob", () => {
    const result = objectToFormData({ published: true });
    const value = result.get("published") as Blob;

    expect(value).toBeInstanceOf(Blob);
    expect(value.type).toBe("application/json");
  });

  it("should convert boolean false to JSON blob", () => {
    const result = objectToFormData({ active: false });
    const value = result.get("active") as Blob;

    expect(value).toBeInstanceOf(Blob);
    expect(value.type).toBe("application/json");
  });

  it("should handle mixed types correctly in one object", () => {
    const file = new File(["x"], "photo.jpg", { type: "image/jpeg" });
    const result = objectToFormData({
      name: "Course Name",
      price: 500000,
      published: true,
      image: file,
      description: null,
      tags: undefined,
    });

    expect(result.get("name")).toBe("Course Name");
    expect(result.get("price")).toBe("500000");
    expect(result.get("published")).toBeInstanceOf(Blob);
    expect(result.get("image")).toBeInstanceOf(File);
    expect(result.get("description")).toBeNull();
    expect(result.get("tags")).toBeNull();
  });
});
