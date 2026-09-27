import { useAuthStore } from "@/hooks/authStore";
import { api } from "@/hooks/upfetch";
import { ProfileOverviewResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProfileOverview = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<ProfileOverviewResponse>({
    queryKey: ["user", "profile", "overview"],
    queryFn: () => api<ProfileOverviewResponse>("/users/profile/overview"),
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });
};
