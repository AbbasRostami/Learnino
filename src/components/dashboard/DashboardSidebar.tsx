"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLogout, useProfile } from "@/services";
import { useAuthStore } from "@/store/authStore";
import {
  BookOpen,
  Heart,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MENU_SECTIONS = [
  {
    key: "general",
    items: [
      { key: "overview", href: "/dashboard", icon: LayoutDashboard },
      { key: "myCourses", href: "/dashboard/my-courses", icon: BookOpen },
      { key: "favorites", href: "/dashboard/favorites", icon: Heart },
      { key: "comments", href: "/dashboard/comments", icon: MessageSquare },
    ],
  },
  {
    key: "finance",
    items: [
      { key: "orders", href: "/dashboard/orders", icon: Package },
      { key: "wallet", href: "/dashboard/wallet", icon: Wallet },
    ],
  },
  {
    key: "personal",
    items: [
      { key: "profile", href: "/dashboard/profile", icon: User },
      { key: "settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const resetAuth = useAuthStore((s) => s.resetAuth);

  const { data: profileData, isLoading } = useProfile();
  const profile = profileData?.data?.profile;

  const { mutate: logout, isPending: isLoggingOut } = useLogout({
    onSuccessCallback: () => resetAuth(),
  });

  const handleLogout = () => {
    logout();
    onNavigate?.();
  };

  const userName =
    profile?.name || profile?.email?.split("@")?.[0] || t("defaultUserName");

  const avatarInitial = (profile?.name || profile?.email || "?")
    .charAt(0)
    ?.toUpperCase();

  return (
    <nav
      aria-label={t("title")}
      className="flex flex-col gap-4 p-5 rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-dashed border-border/60 min-h-16">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-12 shrink-0 rounded-2xl bg-primary/20 animate-pulse" />
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <Skeleton className="h-4 w-28 rounded-lg bg-primary/15 animate-pulse" />
              <Skeleton className="h-3 w-36 rounded-md bg-muted animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border-2 border-background bg-muted shadow-md ring-2 ring-primary/20">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={userName}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-linear-to-br from-primary to-brand-accent text-white text-lg font-black">
                  {avatarInitial}
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground truncate">
                {userName}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                dir="ltr"
              >
                {profile?.email}
              </span>
            </div>
          </>
        )}
      </div>

      {MENU_SECTIONS?.map((section) => (
        <div key={section?.key} className="flex flex-col gap-1">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-wider px-3 mb-1">
            {t(`sections.${section?.key}`)}
          </span>

          {section?.items?.map((item) => {
            const isActive =
              item?.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item?.href);

            return (
              <Link
                key={item?.key}
                href={item?.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive && "scale-110",
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{t(`menu.${item?.key}`)}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <div className="mt-2 pt-4 border-t border-dashed border-border/60">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t("menu.logout")}</span>
        </button>
      </div>
    </nav>
  );
}
