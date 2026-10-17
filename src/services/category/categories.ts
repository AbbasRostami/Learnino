import { api } from "@/lib/upfetch";
import type { CategoryWithCount, GetCategoriesResponse } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

async function fetchCategoriesData(
  locale: string,
): Promise<CategoryWithCount[]> {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const res = await api<GetCategoriesResponse>("/categories", {
    headers: {
      "Accept-Language": locale,
    },
  });

  return res.data?.categories ?? [];
}

export async function getPublicCategoriesServer(
  locale: string = "fa",
): Promise<CategoryWithCount[]> {
  try {
    return await fetchCategoriesData(locale);
  } catch (error) {
    console.error(
      `[Categories Server Fetch Error for locale: ${locale}]`,
      error,
    );
    return [];
  }
}
