import { api } from "@/lib/upfetch";
import type { GetPostBySlugResponse, GetPostsResponse, Post } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

async function fetchLatestPostsData(
  locale: string,
  limit: number,
): Promise<Post[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", "latest-posts");

  try {
    const res = await api<GetPostsResponse>("/posts", {
      params: {
        limit,
        sortBy: "createdAt",
        order: "desc",
      },
      headers: { "Accept-Language": locale },
    });

    return res.data?.items ?? [];
  } catch (error) {
    console.warn(`[Posts Server Fetch Warning for locale: ${locale}]`, error);
    return [];
  }
}

export async function getLatestPostsServer(
  locale: string = "fa",
  limit: number = 3,
): Promise<Post[]> {
  return await fetchLatestPostsData(locale, limit);
}

async function fetchPostBySlugData(
  locale: string,
  rawSlug: string,
): Promise<Post | null> {
  "use cache";
  cacheLife("hours");

  const decodedSlug = decodeURIComponent(rawSlug);
  cacheTag("posts", `post-${decodedSlug}`);

  try {
    const res = await api<GetPostBySlugResponse>(
      `/posts/${encodeURIComponent(decodedSlug)}`,
      {
        headers: { "Accept-Language": locale },
      },
    );

    return res.data?.post ?? null;
  } catch (error) {
    console.warn(
      `[Post Detail Server Fetch Warning for slug: ${rawSlug}]`,
      error,
    );
    return null;
  }
}

export async function getPostBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Post | null> {
  return await fetchPostBySlugData(locale, slug);
}
