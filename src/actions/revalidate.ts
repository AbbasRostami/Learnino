"use server";

import { updateTag } from "next/cache";

export async function revalidateCoursesAction() {
  try {
    updateTag("courses");
    updateTag("courses-list");

    return { ok: true };
  } catch (error) {
    console.error("[Revalidate Courses Error]:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

export async function revalidatePostsAction() {
  try {
    updateTag("posts");
    return { ok: true };
  } catch (error) {
    console.error("[Revalidate Posts Error]:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

export async function revalidateTeachersAction() {
  try {
    updateTag("teachers");
    updateTag("courses");
    updateTag("courses-list");
    return { ok: true };
  } catch (error) {
    console.error("[Revalidate Teachers Error]:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}

export async function revalidateCategoriesAction() {
  try {
    updateTag("categories");
    updateTag("courses");
    updateTag("courses-list");
    updateTag("posts");
    return { ok: true };
  } catch (error) {
    console.error("[Revalidate Categories Error]:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}
