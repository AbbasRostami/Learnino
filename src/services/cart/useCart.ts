import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import type { GetCartResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const useCart = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<GetCartResponse>({
    queryKey: ["cart"],
    queryFn: () => api<GetCartResponse>("/cart"),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });
};
