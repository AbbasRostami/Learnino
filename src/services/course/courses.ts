import { api } from "@/lib/upfetch";
import type {
  Course,
  GetCourseBySlugResponse,
  GetCoursesResponse,
} from "@/types";
import { cacheLife, cacheTag } from "next/cache";

async function fetchFeaturedCoursesData(
  locale: string,
  limit: number,
): Promise<Course[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("courses", "featured-courses");

  const res = await api<GetCoursesResponse>("/courses", {
    params: {
      limit,
      sortBy: "createdAt",
      order: "desc",
    },
    headers: { "Accept-Language": locale },
  });

  return res.data?.items ?? [];
}

export async function getFeaturedCoursesServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<Course[]> {
  try {
    return await fetchFeaturedCoursesData(locale, limit);
  } catch (error) {
    console.error(`[Featured Courses Server Fetch Error]`, error);
    return [];
  }
}

async function fetchFreeCoursesData(
  locale: string,
  limit: number,
): Promise<Course[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("courses", "free-courses");

  const res = await api<GetCoursesResponse>("/courses", {
    params: {
      limit,
      maxPrice: 0,
      sortBy: "createdAt",
      order: "desc",
    },
    headers: { "Accept-Language": locale },
  });

  return res.data?.items ?? [];
}

export async function getFreeCoursesServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<Course[]> {
  try {
    return await fetchFreeCoursesData(locale, limit);
  } catch (error) {
    console.error(`[Free Courses Server Fetch Error]`, error);
    return [];
  }
}

async function fetchCoursesDataIsolated(
  locale: string,
  page: number,
  search: string,
  categoriesStr: string,
  level: string,
  minPrice: number | undefined,
  maxPrice: number | undefined,
  sortBy: string,
  order: "asc" | "desc",
): Promise<GetCoursesResponse | null> {
  "use cache";
  cacheLife("minutes");

  cacheTag("courses-list");

  const categories = categoriesStr ? categoriesStr.split(",") : [];

  const searchParams: Record<string, unknown> = {
    page,
    limit: 12,
    sortBy,
    order,
  };

  if (search) searchParams.search = search;
  if (level) searchParams.level = level;
  if (minPrice !== undefined) searchParams.minPrice = minPrice;
  if (maxPrice !== undefined) searchParams.maxPrice = maxPrice;
  if (categories.length) searchParams.categories = categories;

  const res = await api<GetCoursesResponse>("/courses", {
    params: searchParams,
    headers: { "Accept-Language": locale },
  });

  return res || null;
}

export async function getCoursesServer(
  locale: string = "fa",
  params: {
    page?: number;
    search?: string;
    categories?: string[];
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  } = {},
): Promise<GetCoursesResponse | null> {
  try {
    return await fetchCoursesDataIsolated(
      locale,
      params.page || 1,
      params.search || "",
      params.categories?.join(",") || "",
      params.level || "",
      params.minPrice,
      params.maxPrice,
      params.sortBy || "createdAt",
      params.order || "desc",
    );
  } catch (error) {
    console.error(`[Courses List Server Fetch Error]`, error);
    return null;
  }
}

async function fetchCourseBySlugData(
  locale: string,
  decodedSlug: string,
): Promise<Course | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("courses", `course-${decodedSlug}`);

  const res = await api<GetCourseBySlugResponse>(
    `/courses/${encodeURIComponent(decodedSlug)}`,
    {
      headers: { "Accept-Language": locale },
    },
  );

  return res.data?.course ?? null;
}

export async function getCourseBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Course | null> {
  try {
    return await fetchCourseBySlugData(locale, decodeURIComponent(slug));
  } catch (error) {
    console.error(`[Course Detail Server Fetch Error]`, error);
    return null;
  }
}
