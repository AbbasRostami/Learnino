import { api } from "@/lib/upfetch";
import type { GetPostBySlugResponse, GetPostsResponse, Post } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

export async function getLatestPostsServer(
  locale: string = "fa",
  limit: number = 3,
): Promise<Post[]> {
  try {
    const fetchCached = async () => {
      "use cache";
      cacheLife("hours");
      cacheTag("posts", "latest-posts");

      const res = await api<GetPostsResponse>("/posts", {
        params: { limit, sortBy: "createdAt", order: "desc" },
        headers: { "Accept-Language": locale },
      });

      return res.data?.items ?? [];
    };

    return await fetchCached();
  } catch (error) {
    console.error(`[Latest Posts Server Fetch Error]`, error);
    return [];
  }
}

export async function getPostBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Post | null> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("posts", `post-${slug}`);

    try {
      const encodedSlug = encodeURIComponent(decodeURIComponent(slug));
      const res = await api<GetPostBySlugResponse>(`/posts/${encodedSlug}`, {
        headers: { "Accept-Language": locale },
      });

      return res.data?.post ?? null;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status?: number }).status === 404
      ) {
        return null;
      }
      console.error(`[Post Detail Fetch Error]`, error);
      throw error;
    }
  };

  try {
    return await fetchCached();
  } catch {
    return null;
  }
}
