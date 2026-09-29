import { api } from "@/hooks/upfetch";
import type { GetPostBySlugResponse, GetPostsResponse, Post } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

async function fetchLatestPostsData(
  locale: string,
  limit: number,
): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", "latest-posts");

  const res = await api<GetPostsResponse>("/posts", {
    params: {
      limit,
      sortBy: "createdAt",
      order: "desc",
    },
    headers: { "Accept-Language": locale },
  });

  return res.data?.items ?? [];
}

export async function getLatestPostsServer(
  locale: string = "fa",
  limit: number = 3,
): Promise<Post[]> {
  try {
    return await fetchLatestPostsData(locale, limit);
  } catch (error) {
    console.error(`[Posts Server Fetch Error for locale: ${locale}]`, error);
    return [];
  }
}

async function fetchPostBySlugData(
  locale: string,
  rawSlug: string,
): Promise<Post | null> {
  "use cache";
  cacheLife("hours");

  const decodedSlug = decodeURIComponent(rawSlug);
  cacheTag("posts", `post-${decodedSlug}`);

  const res = await api<GetPostBySlugResponse>(
    `/posts/${encodeURIComponent(decodedSlug)}`,
    {
      headers: { "Accept-Language": locale },
    },
  );

  return res.data?.post ?? null;
}

export async function getPostBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Post | null> {
  try {
    return await fetchPostBySlugData(locale, slug);
  } catch (error) {
    console.error(`[Post Detail Server Fetch Error for slug: ${slug}]`, error);
    return null;
  }
}
