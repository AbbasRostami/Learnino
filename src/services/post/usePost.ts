import { api } from "@/hooks/upfetch";
import type { GetPostBySlugResponse, Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePost = (slug: string | undefined, initialPost?: Post) => {
  return useQuery<GetPostBySlugResponse>({
    queryKey: ["posts", "detail", slug],
    queryFn: () => api<GetPostBySlugResponse>(`/posts/${slug!}`),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
    initialData: initialPost
      ? { status: "success", data: { post: initialPost } }
      : undefined,
  });
};
