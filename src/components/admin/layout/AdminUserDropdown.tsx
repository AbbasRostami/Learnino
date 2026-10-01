"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@/i18n/routing";
import { useLogout, useProfile } from "@/services";
import { useAuthStore } from "@/store/authStore";
import {
  ChevronDown,
  Home,
  LayoutDashboard,
  Loader2,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function AdminUserDropdown() {
  const t = useTranslations("admin.userMenu");
  const router = useRouter();
  const resetAuth = useAuthStore((s) => s.resetAuth);

  const { data, isLoading } = useProfile();
  const profile = data?.data?.profile;

  const { mutate: logout, isPending: isLoggingOut } = useLogout({
    onSuccessCallback: () => {
      resetAuth();
      router.push("/admin-login");
    },
  });

  const displayName =
    profile?.name || profile?.email?.split("@")?.[0] || "Admin";
  const avatarInitial = (profile?.name || profile?.email || "A")
    .charAt(0)
    ?.toUpperCase();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 h-11 rounded-full border border-border bg-card">
        <Skeleton className="h-7 w-7 rounded-full bg-primary/20" />
        <Skeleton className="h-3 w-20 rounded-md bg-primary/15" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-11 rounded-full gap-2 px-3 pe-4 border border-border/60 bg-card hover:bg-muted transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="relative">
          <Avatar className="h-7 w-7 border border-primary/20">
            <AvatarImage src={profile?.avatar || ""} alt={displayName} />
            <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black text-xs">
              {avatarInitial}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-0.5 -inset-e-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 border border-background">
            <ShieldCheck className="h-2 w-2 text-white" strokeWidth={3} />
          </div>
        </div>
        <span className="max-w-30 truncate text-xs font-bold text-foreground hidden sm:inline">
          {displayName}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 z-50">
        <div className="p-3 rounded-xl bg-linear-to-br from-primary/10 via-brand-accent/5 to-transparent border border-primary/15 mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-background shadow-md">
              <AvatarImage src={profile?.avatar || ""} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white font-black">
                {avatarInitial}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-black text-foreground truncate">
                {displayName}
              </span>
              <span
                className="text-[10px] text-muted-foreground truncate font-mono"
                dir="ltr"
              >
                {profile?.email}
              </span>
              <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-black w-fit">
                <ShieldCheck className="h-2.5 w-2.5" />
                <span>ADMIN</span>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
        >
          <User className="h-4 w-4 text-primary" />
          <span>{t("profile")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
        >
          <LayoutDashboard className="h-4 w-4 text-brand-accent" />
          <span>{t("userDashboard")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/")}
          className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold"
        >
          <Home className="h-4 w-4 text-brand-cyan" />
          <span>{t("viewSite")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="cursor-pointer gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 focus:text-rose-600 focus:bg-rose-500/10"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
