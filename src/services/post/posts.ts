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
    console.warn(
      `[Posts Cache Notice for locale: ${locale}]: Backend unavailable or timed out during build.`,
    );
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
      `[Post Detail Cache Notice for slug: ${rawSlug}]: Backend unavailable.`,
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
