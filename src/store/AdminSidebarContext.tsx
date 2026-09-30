"use client";

import { usePathname } from "@/i18n/routing";
import { createContext, useContext, useEffect, useState } from "react";

type AdminSidebarContextType = {
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  closeMobileSidebar: () => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(
  undefined,
);

export const useAdminSidebar = () => {
  const context = useContext(AdminSidebarContext);
  if (!context) {
    throw new Error(
      "useAdminSidebar must be used within an AdminSidebarProvider",
    );
  }
  return context;
};

export const AdminSidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
    setIsHovered(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const activeItem =
    pathname === "/admin" ? "overview" : pathname.split("/")[2] || null;

  return (
    <AdminSidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered: isExpanded ? isHovered : false,
        activeItem,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        closeMobileSidebar,
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
};
