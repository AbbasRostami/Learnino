"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useProfile } from "@/services";
import { useAdminSidebarStore } from "@/store/AdminSidebarContext";
import {
  BookOpen,
  FolderTree,
  Gift,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Package,
  Receipt,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  Tag,
  Users,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReadOnlyBadge } from "../shared";

const MENU_SECTIONS = [
  {
    key: "main",
    items: [{ key: "overview", href: "/admin", icon: LayoutDashboard }],
  },
  {
    key: "users",
    items: [
      { key: "usersList", href: "/admin/users", icon: Users },
      { key: "usersBanned", href: "/admin/users/banned", icon: ShieldOff },
    ],
  },
  {
    key: "content",
    items: [
      { key: "courses", href: "/admin/courses", icon: BookOpen },
      { key: "categories", href: "/admin/categories", icon: FolderTree },
      { key: "teachers", href: "/admin/teachers", icon: GraduationCap },
    ],
  },
  {
    key: "blog",
    items: [
      { key: "posts", href: "/admin/posts", icon: Tag },
      { key: "comments", href: "/admin/comments", icon: MessageSquare },
    ],
  },
  {
    key: "financial",
    items: [
      { key: "orders", href: "/admin/orders", icon: Package },
      { key: "wallets", href: "/admin/wallets", icon: Wallet },
      {
        key: "transactions",
        href: "/admin/wallets/transactions",
        icon: Receipt,
      },
      { key: "discounts", href: "/admin/discounts", icon: Gift },
    ],
  },
];

const ALL_MENU_HREFS = MENU_SECTIONS.flatMap((s) => s.items.map((i) => i.href));

export function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { isExpanded, isMobileOpen, isMobile, closeMobileSidebar, setStates } =
    useAdminSidebarStore();

  const { data, isLoading } = useProfile();
  const profile = data?.data?.profile;

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setStates({
        isMobile: mobile,
        ...(mobile ? { isMobileOpen: false } : {}),
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setStates]);

  useEffect(() => {
    if (!mounted) return;
    const currentActive =
      pathname === "/admin" ? "overview" : pathname.split("/")[2] || null;
    setStates({ isMobileOpen: false, activeItem: currentActive });
  }, [pathname, mounted, setStates]);

  if (!mounted) {
    return (
      <div className="w-22 lg:w-70 h-screen fixed top-0 inset-s-0 bg-card border-e opacity-10" />
    );
  }

  const isSidebarOpen = isMobile ? true : isExpanded;

  const isItemActive = (href: string) => {
    if (pathname === href) return true;
    if (href === "/admin") return false;
    return (
      pathname.startsWith(`${href}/`) && !ALL_MENU_HREFS.includes(pathname)
    );
  };

  const commonProps = {
    t,
    isSidebarOpen,
    isItemActive,
    profile,
    isLoading,
    onNavigate: isMobile ? closeMobileSidebar : () => {},
  };

  return (
    <TooltipProvider delay={200}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed top-0 h-screen z-50 hidden lg:flex flex-col inset-s-0",
          "bg-card/95 backdrop-blur-xl border-border/50 border-e",
          "transition-all duration-300 ease-in-out shadow-xl shadow-primary/5",
          isExpanded ? "w-70" : "w-22",
        )}
        aria-label={t("title")}
      >
        <SidebarLogo {...commonProps} />
        <SidebarProfile {...commonProps} />
        <SidebarNav {...commonProps} />
        <SidebarFooter {...commonProps} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 h-screen z-50 lg:hidden flex flex-col w-70 inset-s-0",
          "bg-card border-e border-border/50 shadow-2xl transition-transform duration-300 ease-in-out",
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full",
        )}
        aria-label={t("title")}
      >
        <SidebarLogo {...commonProps} />
        <SidebarProfile {...commonProps} />
        <SidebarNav {...commonProps} />
        <SidebarFooter {...commonProps} />
      </aside>
    </TooltipProvider>
  );
}

interface SidebarSharedProps {
  t: (key: string) => string;
  isSidebarOpen: boolean;
  isItemActive: (href: string) => boolean;
  profile:
    | { avatar?: string | null; email?: string; name?: string }
    | undefined;
  isLoading: boolean;
  onNavigate: () => void;
}

function SidebarLogo({ t, isSidebarOpen, onNavigate }: SidebarSharedProps) {
  return (
    <div className="flex items-center p-4 border-b border-border/50 min-h-18">
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex items-center gap-3 min-w-0 group w-full"
      >
        <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-2xl p-1 group-hover:scale-105 transition-transform">
          <Image
            src="/logo/Main-Logo.png"
            alt="Learnino Logo"
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>

        {isSidebarOpen && (
          <div className="flex flex-col min-w-0 overflow-hidden animate-in fade-in slide-in-from-start-2 duration-200">
            <span className="text-sm font-black text-foreground truncate">
              {t("title")}
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}

function SidebarProfile({
  t,
  isSidebarOpen,
  profile,
  isLoading,
}: SidebarSharedProps) {
  const userName =
    profile?.name || profile?.email?.split("@")?.[0] || t("defaultUserName");
  const avatarInitial = (profile?.name || profile?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 border-b border-dashed border-border/50",
        !isSidebarOpen && "justify-center",
      )}
    >
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-10 shrink-0 rounded-2xl bg-primary/20 animate-pulse" />
          {isSidebarOpen && (
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <Skeleton className="h-3 w-24 rounded-md bg-primary/15" />
              <Skeleton className="h-2.5 w-32 rounded-md bg-muted" />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl border-2 border-background bg-muted shadow-sm ring-2 ring-primary/20">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={userName}
                  fill
                  sizes="60px"
                  quality={75}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-linear-to-br from-primary to-brand-accent text-white text-sm font-black">
                  {avatarInitial}
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -inset-e-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 border-2 border-background">
              <ShieldCheck className="h-2 w-2 text-white" strokeWidth={3} />
            </div>
          </div>

          {isSidebarOpen && (
            <div className="flex flex-col min-w-0 overflow-hidden animate-in fade-in slide-in-from-start-2 duration-200">
              <span className="text-xs font-bold text-foreground truncate">
                {userName}
              </span>
              <span
                className="text-[10px] text-muted-foreground truncate mb-0.5"
                dir="ltr"
              >
                {profile?.email}
              </span>
              <div className="w-fit">
                <ReadOnlyBadge
                  className="text-[9px] px-1.5 py-0.5"
                  showIcon={false}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SidebarNav({
  t,
  isSidebarOpen,
  isItemActive,
  onNavigate,
}: SidebarSharedProps) {
  return (
    <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
      <div className="flex flex-col gap-1 px-3">
        {MENU_SECTIONS.map((section) => (
          <div key={section.key} className="flex flex-col gap-1 mb-4">
            {isSidebarOpen && (
              <span className="text-xs font-black text-muted-foreground uppercase tracking-wider px-3 mb-1 animate-in fade-in duration-200">
                {t(`sections.${section.key}`)}
              </span>
            )}

            {section.items.map((item) => {
              const isActive = isItemActive(item.href);
              const itemTitle = t(`menu.${item.key}`);

              const linkContent = (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl transition-all cursor-pointer",
                    "text-xs font-bold",
                    isSidebarOpen ? "px-3 py-2.5" : "px-3 py-3 justify-center",
                    isActive
                      ? "bg-linear-to-r from-primary to-brand-accent text-primary-foreground shadow-md shadow-primary/20"
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

                  {isSidebarOpen && (
                    <span className="truncate animate-in fade-in slide-in-from-start-2 duration-200">
                      {itemTitle}
                    </span>
                  )}
                </Link>
              );

              if (!isSidebarOpen) {
                return (
                  <Tooltip key={item.key}>
                    <TooltipTrigger>
                      <div>{linkContent}</div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="text-xs font-bold rounded-xl px-3 py-1.5 shadow-xl"
                    >
                      {itemTitle}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.key}>{linkContent}</div>;
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}

function SidebarFooter({ t, isSidebarOpen, onNavigate }: SidebarSharedProps) {
  return (
    <div className="p-3 border-t border-border/50">
      {isSidebarOpen ? (
        <Link
          href="/"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all cursor-pointer text-xs font-bold text-muted-foreground hover:bg-primary/5 hover:text-primary"
        >
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate animate-in fade-in slide-in-from-start-2 duration-200">
            {t("userMenu.viewSite")}
          </span>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href="/"
              onClick={onNavigate}
              className="group flex items-center justify-center rounded-2xl p-3 transition-all cursor-pointer text-xs font-bold text-muted-foreground hover:bg-primary/5 hover:text-primary"
            >
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="text-xs font-bold rounded-xl px-3 py-1.5 shadow-xl"
          >
            {t("userMenu.viewSite")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
