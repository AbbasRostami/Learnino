"use client";

import { cn } from "@/lib/utils";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { useAdminSidebarStore } from "@/store/AdminSidebarContext";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const { isExpanded, isHovered, isMobileOpen, closeMobileSidebar } =
    useAdminSidebarStore();

  const sidebarWidthClass =
    isExpanded || isHovered ? "lg:ms-[280px]" : "lg:ms-[88px]";

  return (
    <div className="relative min-h-screen bg-background">
      <div
        className="fixed top-0 inset-x-0 h-96 bg-linear-to-b from-primary/5 via-primary/2 to-transparent -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <AdminSidebar />

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out will-change-transform",
          sidebarWidthClass,
        )}
      >
        <AdminHeader />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <div className="mb-6">
            <AdminBreadcrumb />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
