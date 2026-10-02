import { useGuestCart } from "@/hooks/useGuestCart";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

const GUEST_CART_KEY = "learnino_guest_cart";

const createMockCartItem = (courseId: string, overrides = {}) => ({
  id: courseId,
  courseId,
  title: "Test Course",
  slug: "test-course",
  price: 500000,
  imageUrl: null,
  level: "BEGINNER",
  category: { id: "cat-1", name: "Programming", slug: "programming" },
  addedAt: new Date().toISOString(),
  ...overrides,
});

// Tests for useGuestCart hook

describe("useGuestCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty items array when localStorage is empty", async () => {
    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.guestItems).toEqual([]);
    expect(result.current.guestCourseIds).toEqual([]);
  });

  it("should set isReady to true after initial load completes", async () => {
    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));
  });

  it("should load valid cart items from localStorage on mount", async () => {
    const items = [createMockCartItem("uuid-1"), createMockCartItem("uuid-2")];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.guestItems).toHaveLength(2);
    expect(result.current.guestCourseIds).toEqual(["uuid-1", "uuid-2"]);
  });

  it("should handle legacy string-only items in localStorage gracefully", async () => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(["uuid-1", "uuid-2"]));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.guestItems).toHaveLength(2);
    expect(result.current.guestItems[0].courseId).toBe("uuid-1");
    expect(result.current.guestItems[0].title).toBe("دوره آموزشی");
  });

  it("should return empty array when localStorage contains invalid JSON", async () => {
    localStorage.setItem(GUEST_CART_KEY, "not-a-valid-json{{{");

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.guestItems).toEqual([]);
  });

  it("should remove a specific item by courseId", async () => {
    const items = [
      createMockCartItem("uuid-1"),
      createMockCartItem("uuid-2"),
      createMockCartItem("uuid-3"),
    ];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    act(() => {
      result.current.removeGuestItem("uuid-2");
    });

    expect(result.current.guestItems).toHaveLength(2);
    expect(result.current.guestCourseIds).toEqual(["uuid-1", "uuid-3"]);
  });

  it("should persist removal to localStorage", async () => {
    const items = [createMockCartItem("uuid-1"), createMockCartItem("uuid-2")];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    act(() => {
      result.current.removeGuestItem("uuid-1");
    });

    const stored = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].courseId).toBe("uuid-2");
  });

  it("should not throw when removing a non-existent item", async () => {
    const items = [createMockCartItem("uuid-1")];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(() => {
      act(() => {
        result.current.removeGuestItem("non-existent-uuid");
      });
    }).not.toThrow();

    expect(result.current.guestItems).toHaveLength(1);
  });

  it("should clear all items when clearGuestCart is called", async () => {
    const items = [createMockCartItem("uuid-1"), createMockCartItem("uuid-2")];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    act(() => {
      result.current.clearGuestCart();
    });

    expect(result.current.guestItems).toEqual([]);
    expect(localStorage.getItem(GUEST_CART_KEY)).toBeNull();
  });

  it("should sync between multiple hook instances via cart-updated event", async () => {
    const { result: result1 } = renderHook(() => useGuestCart());
    const { result: result2 } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result1.current.isReady).toBe(true));
    await waitFor(() => expect(result2.current.isReady).toBe(true));

    const items = [createMockCartItem("uuid-1")];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    act(() => {
      window.dispatchEvent(new Event("cart-updated"));
    });

    await waitFor(() => {
      expect(result1.current.guestItems).toHaveLength(1);
      expect(result2.current.guestItems).toHaveLength(1);
    });
  });

  it("should compute guestCourseIds correctly from guestItems", async () => {
    const items = [
      createMockCartItem("uuid-a"),
      createMockCartItem("uuid-b"),
      createMockCartItem("uuid-c"),
    ];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

    const { result } = renderHook(() => useGuestCart());

    await waitFor(() => expect(result.current.isReady).toBe(true));

    expect(result.current.guestCourseIds).toEqual([
      "uuid-a",
      "uuid-b",
      "uuid-c",
    ]);
  });
});
