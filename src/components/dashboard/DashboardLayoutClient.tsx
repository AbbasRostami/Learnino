"use client";

import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-primary/10 via-brand-accent/5 to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-6 lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DashboardSidebar />
            </div>
          </aside>

          <div className="min-w-0">
            <DashboardHeader
              onToggleMobileMenu={() => setMobileSidebarOpen(true)}
              mobileSidebarOpen={mobileSidebarOpen}
              onCloseMobileMenu={() => setMobileSidebarOpen(false)}
            />
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
