"use client";

import { AppBreadcrumb } from "@/components/shared/AppBreadcrumb";
import { buttonVariants } from "@/components/ui/button"; // 👈 استایل‌های دکمه
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "../layout/Navbar/LanguageToggle";
import { ThemeToggle } from "../layout/Navbar/ThemeToggle";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardHeaderProps {
  onToggleMobileMenu: () => void;
  mobileSidebarOpen: boolean;
  onCloseMobileMenu: () => void;
}

export function DashboardHeader({
  onToggleMobileMenu,
  mobileSidebarOpen,
  onCloseMobileMenu,
}: DashboardHeaderProps) {
  const t = useTranslations("dashboard");

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <AppBreadcrumb />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />

        <Sheet
          open={mobileSidebarOpen}
          onOpenChange={(open) => {
            if (open) {
              onToggleMobileMenu();
            } else {
              onCloseMobileMenu();
            }
          }}
        >
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "lg:hidden rounded-xl shrink-0 cursor-pointer",
            )}
            aria-label={t("menu.overview")}
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:max-w-sm p-4 overflow-y-auto [&>button]:hidden"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>{t("title")}</SheetTitle>
              <SheetDescription>پنل کاربری</SheetDescription>
            </SheetHeader>
            <DashboardSidebar onNavigate={onCloseMobileMenu} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
