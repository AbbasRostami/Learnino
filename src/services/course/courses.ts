import { api } from "@/lib/upfetch";
import type {
  Course,
  GetCourseBySlugResponse,
  GetCoursesResponse,
} from "@/types";
import { cacheLife, cacheTag } from "next/cache";

export async function getFeaturedCoursesServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<Course[]> {
  try {
    const fetchCached = async () => {
      "use cache";
      cacheLife("hours");
      cacheTag("courses", "featured-courses");

      const res = await api<GetCoursesResponse>("/courses", {
        params: { limit, sortBy: "createdAt", order: "desc" },
        headers: { "Accept-Language": locale },
      });

      return res.data?.items ?? [];
    };

    return await fetchCached();
  } catch (error) {
    console.error(`[Featured Courses Server Fetch Error]`, error);
    return [];
  }
}

export async function getFreeCoursesServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<Course[]> {
  try {
    const fetchCached = async () => {
      "use cache";
      cacheLife("hours");
      cacheTag("courses", "free-courses");

      const res = await api<GetCoursesResponse>("/courses", {
        params: { limit, maxPrice: 0, sortBy: "createdAt", order: "desc" },
        headers: { "Accept-Language": locale },
      });

      return res.data?.items ?? [];
    };

    return await fetchCached();
  } catch (error) {
    console.error(`[Free Courses Server Fetch Error]`, error);
    return [];
  }
}

export async function getCoursesServer(
  locale: string = "fa",
  params: Record<string, unknown> = {},
): Promise<GetCoursesResponse | null> {
  try {
    const fetchCached = async () => {
      "use cache";
      cacheLife("minutes");
      cacheTag("courses-list");

      return await api<GetCoursesResponse>("/courses", {
        params,
        headers: { "Accept-Language": locale },
      });
    };

    return await fetchCached();
  } catch (error) {
    console.error(`[Courses List Server Fetch Error]`, error);
    return null;
  }
}

export async function getCourseBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Course | null> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("courses", `course-${slug}`);

    try {
      const encodedSlug = encodeURIComponent(decodeURIComponent(slug));
      const res = await api<GetCourseBySlugResponse>(
        `/courses/${encodedSlug}`,
        {
          headers: { "Accept-Language": locale },
        },
      );

      return res.data?.course ?? null;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status?: number }).status === 404
      ) {
        return null;
      }
      console.error(`[Course Detail Fetch Error]`, error);
      throw error;
    }
  };

  try {
    return await fetchCached();
  } catch {
    return null;
  }
}
