import { api, isApiErrorStatus } from "@/lib/upfetch";
import type { GetPostBySlugResponse, GetPostsResponse, Post } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

export async function getLatestPostsServer(
  locale: string = "fa",
  limit: number = 3,
): Promise<Post[]> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("hours");
    cacheTag("posts", "latest-posts");

    const res = await api<GetPostsResponse>("/posts", {
      params: { limit, sortBy: "createdAt", order: "desc" },
      headers: { "Accept-Language": locale },
    });

    return res.data.items;
  };

  return await fetchCached();
}

export async function getPostBySlugServer(
  locale: string = "fa",
  slug: string,
): Promise<Post | null> {
  const fetchCached = async () => {
    "use cache";
    cacheLife("minutes");
    cacheTag("posts", `post-${slug}`);

    try {
      const res = await api<GetPostBySlugResponse>(
        `/posts/${encodeURIComponent(slug)}`,
        {
          headers: { "Accept-Language": locale },
        },
      );

      return res.data.post;
    } catch (error: unknown) {
      if (isApiErrorStatus(error, 404)) {
        return null;
      }
      throw error;
    }
  };

  return await fetchCached();
}
