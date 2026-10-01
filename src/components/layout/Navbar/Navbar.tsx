"use client";

import { useAuthStore } from "@/store/authStore";
import { Suspense } from "react";
import { AuthButtons } from "./AuthButtons";
import { CartButton } from "./CartButton";
import { DesktopNav } from "./DesktopNav";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <MobileNav />
            <Logo />
            <DesktopNav />
          </div>

          <div className="hidden md:flex flex-1 justify-center max-w-sm">
            <Suspense
              fallback={
                <div className="h-10 w-full max-w-xs bg-muted/30 rounded-full animate-pulse" />
              }
            >
              <SearchInput />
            </Suspense>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <CartButton />
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>
        </div>
      </div>
    </header>
  );
}
