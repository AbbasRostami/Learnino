import { api } from "@/hooks/upfetch";
import type { Course, GetCoursesResponse } from "@/types";
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

import { GetCourseBySlugResponse } from "@/types";

async function fetchCoursesData(
  locale: string,
  params: {
    page?: number;
    search?: string;
    categories?: string[];
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  },
): Promise<GetCoursesResponse | null> {
  "use cache";
  cacheLife("minutes");

  const cacheKey = `${params.page || 1}-${params.search || ""}-${params.categories?.join(",") || ""}-${params.level || ""}-${params.minPrice || ""}-${params.maxPrice || ""}-${params.sortBy || ""}-${params.order || ""}`;
  cacheTag("courses-list", `courses-list-${locale}-${cacheKey}`);

  const searchParams: Record<string, unknown> = {
    page: params.page || 1,
    limit: 12,
    sortBy: params.sortBy || "createdAt",
    order: params.order || "desc",
  };

  if (params.search) searchParams.search = params.search;
  if (params.level) searchParams.level = params.level;
  if (params.minPrice !== undefined) searchParams.minPrice = params.minPrice;
  if (params.maxPrice !== undefined) searchParams.maxPrice = params.maxPrice;
  if (params.categories?.length) searchParams.categories = params.categories;

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
    return await fetchCoursesData(locale, params);
  } catch (error) {
    console.error(`[Courses List Server Fetch Error]`, error);
    return null;
  }
}

async function fetchCourseBySlugData(
  locale: string,
  rawSlug: string,
): Promise<Course | null> {
  "use cache";
  cacheLife("hours");

  const decodedSlug = decodeURIComponent(rawSlug);
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
    return await fetchCourseBySlugData(locale, slug);
  } catch (error) {
    console.error(`[Course Detail Server Fetch Error]`, error);
    return null;
  }
}
