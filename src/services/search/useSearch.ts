import { api } from "@/lib/upfetch";
import { SearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (q: string) => {
  return useQuery<SearchResponse>({
    queryKey: ["search", q],
    queryFn: () =>
      api<SearchResponse>(`/search?q=${encodeURIComponent(q)}&limit=5`),
    enabled: q.trim().length >= 2,
    staleTime: 60 * 1000,
  });
};
