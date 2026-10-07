"use client";

import { create } from "zustand";

type AdminSidebarState = {
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  activeItem: string | null;
  setIsHovered: (isHovered: boolean) => void;
  setStates: (
    states: Partial<
      Omit<
        AdminSidebarState,
        | "setIsHovered"
        | "toggleSidebar"
        | "toggleMobileSidebar"
        | "closeMobileSidebar"
        | "setStates"
      >
    >,
  ) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

export const useAdminSidebarStore = create<AdminSidebarState>((set) => ({
  isExpanded: true,
  isHovered: false,
  isMobileOpen: false,
  isMobile: false,
  activeItem: null,

  setIsHovered: (isHovered) => set({ isHovered }),
  setStates: (states) => set((state) => ({ ...state, ...states })),

  toggleSidebar: () =>
    set((state) => ({ isExpanded: !state.isExpanded, isHovered: false })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  closeMobileSidebar: () => set({ isMobileOpen: false }),
}));
