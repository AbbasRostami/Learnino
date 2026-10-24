import {
  formatFullDate,
  formatNumber,
  formatRelativeTime,
  formatShortDate,
} from "@/utils/formatters";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.unmock("@/utils/formatters");

describe("formatNumber", () => {
  it("should return dash '-' when input is null", () => {
    expect(formatNumber(null)).toBe("-");
  });

  it("should return dash '-' when input is undefined", () => {
    expect(formatNumber(undefined)).toBe("-");
  });

  it("should return dash '-' when input is an empty string", () => {
    expect(formatNumber("")).toBe("-");
  });

  it("should return dash '-' when input is not a valid number", () => {
    expect(formatNumber("not-a-number")).toBe("-");
    expect(formatNumber("abc")).toBe("-");
  });

  it("should format a number with English locale by default", () => {
    const result = formatNumber(1000000);
    expect(result).toBe("1,000,000");
  });

  it("should format a number with Persian locale when specified", () => {
    const result = formatNumber(1000000, "fa");
    expect(result).toContain("۱");
    expect(result).toContain("۰");
  });

  it("should format zero correctly in both locales", () => {
    expect(formatNumber(0, "en")).toBe("0");
    expect(formatNumber(0, "fa")).toBe("۰");
  });

  it("should format negative numbers correctly", () => {
    expect(formatNumber(-500000, "en")).toBe("-500,000");
  });

  it("should convert string numbers to formatted output", () => {
    expect(formatNumber("1500", "en")).toBe("1,500");
  });

  it("should handle decimal numbers", () => {
    expect(formatNumber(1234.56, "en")).toBe("1,234.56");
  });
});

describe("formatFullDate", () => {
  it("should return dash '-' when date is null", () => {
    expect(formatFullDate(null)).toBe("-");
  });

  it("should return dash '-' when date is undefined", () => {
    expect(formatFullDate(undefined)).toBe("-");
  });

  it("should return dash '-' when date string is invalid", () => {
    expect(formatFullDate("invalid-date-string")).toBe("-");
  });

  it("should format a valid ISO date string with English locale", () => {
    const result = formatFullDate("2024-06-15T10:30:00Z", "en");
    expect(result).toContain("2024");
    expect(result).not.toBe("-");
  });

  it("should format a Date object correctly", () => {
    const date = new Date("2024-06-15T10:30:00Z");
    const result = formatFullDate(date, "en");
    expect(result).not.toBe("-");
    expect(result).toContain("2024");
  });

  it("should format with Persian locale by default", () => {
    const result = formatFullDate("2024-06-15T10:30:00Z");
    expect(result).not.toBe("-");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatShortDate", () => {
  it("should return dash '-' when date is null", () => {
    expect(formatShortDate(null)).toBe("-");
  });

  it("should return dash '-' when date is invalid", () => {
    expect(formatShortDate("bad-date")).toBe("-");
  });

  it("should format valid date in English locale", () => {
    const result = formatShortDate("2024-06-15", "en");
    expect(result).toContain("2024");
    expect(result).not.toBe("-");
  });

  it("should format valid date in Persian locale by default", () => {
    const result = formatShortDate("2024-06-15");
    expect(result).not.toBe("-");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return dash '-' when date is null", () => {
    expect(formatRelativeTime(null)).toBe("-");
  });

  it("should return dash '-' when date is invalid", () => {
    expect(formatRelativeTime("invalid")).toBe("-");
  });

  it("should return 'just now' in English for dates less than 60 seconds ago", () => {
    const thirtySecondsAgo = new Date("2024-06-15T11:59:30Z").toISOString();
    expect(formatRelativeTime(thirtySecondsAgo, "en")).toBe("just now");
  });

  it("should return 'همین الان' in Persian for dates less than 60 seconds ago", () => {
    const thirtySecondsAgo = new Date("2024-06-15T11:59:30Z").toISOString();
    expect(formatRelativeTime(thirtySecondsAgo, "fa")).toBe("همین الان");
  });

  it("should format minutes ago correctly in English", () => {
    const fiveMinutesAgo = new Date("2024-06-15T11:55:00Z").toISOString();
    const result = formatRelativeTime(fiveMinutesAgo, "en");
    expect(result).toContain("5");
    expect(result.toLowerCase()).toContain("minute");
  });

  it("should format hours ago correctly in English", () => {
    const twoHoursAgo = new Date("2024-06-15T10:00:00Z").toISOString();
    const result = formatRelativeTime(twoHoursAgo, "en");
    expect(result).toContain("2");
    expect(result.toLowerCase()).toContain("hour");
  });

  it("should format days ago correctly in English", () => {
    const threeDaysAgo = new Date("2024-06-12T12:00:00Z").toISOString();
    const result = formatRelativeTime(threeDaysAgo, "en");
    expect(result).toContain("3");
    expect(result.toLowerCase()).toContain("day");
  });

  it("should format months ago correctly in English", () => {
    const twoMonthsAgo = new Date("2024-04-16T12:00:00Z").toISOString();
    const result = formatRelativeTime(twoMonthsAgo, "en");
    expect(result).toContain("2");
    expect(result.toLowerCase()).toContain("month");
  });

  it("should format years ago correctly in English", () => {
    const twoYearsAgo = new Date("2022-06-16T12:00:00Z").toISOString();
    const result = formatRelativeTime(twoYearsAgo, "en");
    expect(result).toContain("2");
    expect(result.toLowerCase()).toContain("year");
  });

  it("should handle future dates correctly", () => {
    const inTwoHours = new Date("2024-06-15T14:00:00Z").toISOString();
    const result = formatRelativeTime(inTwoHours, "en");
    expect(result).toContain("2");
  });
});