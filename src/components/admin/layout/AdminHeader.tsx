"use client";

import { LanguageToggle } from "@/components/layout/Navbar/LanguageToggle";
import { ThemeToggle } from "@/components/layout/Navbar/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminSidebarStore } from "@/store/AdminSidebarContext";
import { ChevronsLeft, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { AdminUserDropdown } from "./AdminUserDropdown";

export function AdminHeader() {
  const t = useTranslations("admin");
  const { toggleSidebar, toggleMobileSidebar, isExpanded, isMobileOpen } =
    useAdminSidebarStore();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:px-8 py-3 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "lg:hidden rounded-xl shrink-0 cursor-pointer",
            )}
            aria-label={t("menu.overview")}
            aria-expanded={isMobileOpen}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "hidden lg:flex rounded-xl shrink-0 cursor-pointer hover:bg-primary/10 hover:text-primary transition-all",
            )}
            aria-label="Toggle sidebar"
            title={isExpanded ? "بستن سایدبار" : "باز کردن سایدبار"}
          >
            <ChevronsLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                !isExpanded && "rotate-180 rtl:rotate-0",
                isExpanded && "rtl:rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <LanguageToggle />
          <div className="w-px h-6 bg-border mx-1" aria-hidden="true" />
          <AdminUserDropdown />
        </div>
      </div>
    </header>
  );
}
