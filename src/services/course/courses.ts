import { api, isApiErrorStatus } from "@/lib/upfetch";
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
  const fetchCached = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("courses", "featured-courses");

    const res = await api<GetCoursesResponse>("/courses", {
      params: { limit, sortBy: "createdAt", order: "desc" },
      headers: { "Accept-Language": locale },
    });

    return res.data.items;
  };

  return await fetchCached();
}

export async function getFreeCoursesServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<Course[]> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("courses", "free-courses");

    const res = await api<GetCoursesResponse>("/courses", {
      params: { limit, maxPrice: 0, sortBy: "createdAt", order: "desc" },
      headers: { "Accept-Language": locale },
    });

    return res.data.items;
  };

  return await fetchCached();
}

export async function getCoursesServer(
  locale: string = "fa",
  params: Record<string, unknown> = {},
): Promise<GetCoursesResponse> {
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
}

export async function getCourseBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Course | null> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("minutes");
    cacheTag("courses", `course-${slug}`);

    try {
      const res = await api<GetCourseBySlugResponse>(
        `/courses/${encodeURIComponent(slug)}`,
        {
          headers: { "Accept-Language": locale },
        },
      );

      return res.data.course;
    } catch (error: unknown) {
      if (isApiErrorStatus(error, 404)) {
        return null;
      }
      throw error;
    }
  };

  return await fetchCached();
}
