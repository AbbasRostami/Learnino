import { api, isApiErrorStatus } from "@/lib/upfetch";
import type {
  GetTeacherBySlugResponse,
  GetTeachersResponse,
  TeacherListItem,
} from "@/types";
import { cacheLife, cacheTag } from "next/cache";

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

  return res.data.items;
}

export async function getTopTeachersServer(
  locale: string = "fa",
  limit: number = 8,
): Promise<TeacherListItem[]> {
  return await fetchTopTeachersData(locale, limit);
}

async function fetchTeacherBySlugData(
  locale: string,
  slug: string,
): Promise<GetTeacherBySlugResponse["data"]["teacher"] | null> {
  "use cache";
  cacheLife("minutes");

  cacheTag("teachers", `teacher-${slug}`);

  const res = await api<GetTeacherBySlugResponse>(
    `/teachers/${encodeURIComponent(slug)}`,
    {
      headers: { "Accept-Language": locale },
    },
  );

  return res.data.teacher;
}

export async function getTeacherBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<GetTeacherBySlugResponse["data"]["teacher"] | null> {
  try {
    return await fetchTeacherBySlugData(locale, slug);
  } catch (error) {
    if (isApiErrorStatus(error, 404)) {
      return null;
    }

    throw error;
  }
}
