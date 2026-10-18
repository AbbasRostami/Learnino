"use client";

import { Link } from "@/i18n/routing";
import {
  BookOpen,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout, useProfile } from "@/services";

export function UserMenu() {
  const t = useTranslations("user");
  const { data: profileData, isLoading } = useProfile();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  if (isLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  const profile = profileData?.data?.profile;

  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ||
    profile?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          aria-label={t("myAccount")}
          className="h-10 w-10 rounded-full cursor-pointer p-0 outline-none transition-opacity hover:opacity-90 flex items-center justify-center"
        >
          <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
            <AvatarImage
              src={profile?.avatar || undefined}
              alt={profile?.name}
            />
            <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-primary-foreground text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={profile?.avatar || undefined}
                  alt={profile?.name}
                />
                <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-primary-foreground text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {profile?.name || t("myAccount")}
                </p>
                <p className="text-xs text-muted-foreground truncate" dir="ltr">
                  {profile?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/profile" />}
          >
            <User className="h-4 w-4" />
            <span>{t("profile")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/my-courses" />}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t("myCourses")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/favorites" />}
          >
            <Heart className="h-4 w-4" />
            <span>{t("myFavorites")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/wallet" />}
          >
            <Wallet className="h-4 w-4" />
            <span>{t("wallet")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/orders" />}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{t("orders")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/dashboard/settings" />}
          >
            <Settings className="h-4 w-4" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => logout()}
            disabled={isLogoutPending}
          >
            <LogOut className="h-4 w-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
