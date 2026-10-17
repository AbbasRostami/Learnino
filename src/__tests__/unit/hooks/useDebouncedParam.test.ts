import { useDebouncedParam } from "@/hooks/useDebouncedParam";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useDebouncedParam Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should debounce value changes and trigger callback after delay", () => {
    const onUpdateMock = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedParam("", onUpdateMock, 400),
    );

    act(() => {
      const [, setValue] = result.current;
      setValue("r");
    });

    expect(onUpdateMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    act(() => {
      const [, setValue] = result.current;
      setValue("re");
    });

    expect(onUpdateMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith("re");
  });
});
