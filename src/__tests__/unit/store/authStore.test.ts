import { useAuthStore } from "@/store/authStore";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.unmock("@/store/authStore");

describe("useAuthStore", () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.getState().resetAuth();
    });
  });

  it("should initialize with isAuthenticated as false", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
  });

  it("should set isAuthenticated to true when setAuthenticated is called with true", () => {
    act(() => {
      useAuthStore.getState().setAuthenticated(true);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it("should set isAuthenticated to false when setAuthenticated is called with false", () => {
    act(() => {
      useAuthStore.getState().setAuthenticated(true);
      useAuthStore.getState().setAuthenticated(false);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("should reset isAuthenticated to false when resetAuth is called", () => {
    act(() => {
      useAuthStore.getState().setAuthenticated(true);
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    act(() => {
      useAuthStore.getState().resetAuth();
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("should persist state changes to localStorage", () => {
    act(() => {
      useAuthStore.getState().setAuthenticated(true);
    });

    const stored = localStorage.getItem("auth-storage");
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed.state.isAuthenticated).toBe(true);
  });

  it("should handle multiple sequential state changes correctly", () => {
    act(() => {
      useAuthStore.getState().setAuthenticated(true);
      useAuthStore.getState().setAuthenticated(false);
      useAuthStore.getState().setAuthenticated(true);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
