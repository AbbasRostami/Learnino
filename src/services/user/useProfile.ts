import { api } from "@/lib/upfetch";
import { useAuthStore } from "@/store/authStore";
import { UserProfileResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useProfile = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const locale = useLocale();

  return useQuery<UserProfileResponse>({
    queryKey: ["user", "profile", locale],
    queryFn: () => api<UserProfileResponse>("/users/profile"),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};
