import { api } from "@/hooks/upfetch";
import type { GetTeachersResponse, TeacherListItem } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

/**
 * ⚡ تابع کش‌شونده سروری دریافت مدرسان با up-fetch
 */
async function fetchTopTeachersData(
  locale: string,
  limit: number,
): Promise<TeacherListItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("teachers", "top-teachers");

  const res = await api<GetTeachersResponse>("/teachers", {
    params: { limit },
    headers: { "Accept-Language": locale },
  });

  return res.data?.items ?? [];
}


export async function getTopTeachersServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<TeacherListItem[]> {
  try {
    return await fetchTopTeachersData(locale, limit);
  } catch (error) {
    console.error(`[Top Teachers Server Fetch Error]`, error);
    return [];
  }
}

import type { GetTeacherBySlugResponse } from "@/types";


async function fetchTeacherBySlugData(
  locale: string,
  rawSlug: string,
): Promise<GetTeacherBySlugResponse["data"]["teacher"] | null> {
  "use cache";
  cacheLife("hours");

  const decodedSlug = decodeURIComponent(rawSlug);
  cacheTag("teachers", `teacher-${decodedSlug}`);

  const res = await api<GetTeacherBySlugResponse>(`/teachers/${decodedSlug}`, {
    headers: { "Accept-Language": locale },
  });

  return res.data?.teacher ?? null;
}

export async function getTeacherBySlugServer(
  locale: string = "fa",
  slug: string,
) {
  try {
    return await fetchTeacherBySlugData(locale, slug);
  } catch (error) {
    console.error(
      `[Teacher Detail Server Fetch Error for slug: ${slug}]`,
      error,
    );
    return null;
  }
}
