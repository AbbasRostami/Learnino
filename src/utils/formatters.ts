export function formatNumber(
  num?: number | string | null,
  locale: string = "fa",
): string {
  if (num === null || num === undefined || num === "") return "-";

  const parsedNum = typeof num === "string" ? Number(num) : num;
  if (Number.isNaN(parsedNum)) return "-";

  const targetLocale =
    locale === "en" || locale === "en-US" ? "en-US" : "fa-IR";

  return new Intl.NumberFormat(targetLocale).format(parsedNum);
}

export const formatFullDate = (
  date?: string | Date | null,
  locale = "fa",
): string => {
  if (!date) return "-";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export const formatShortDate = (
  date?: string | Date | null,
  locale = "fa",
): string => {
  if (!date) return "-";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export const formatRelativeTime = (
  date?: string | Date | null,
  locale: string = "fa",
): string => {
  if (!date) return "-";

  const d = new Date(date).getTime();
  if (Number.isNaN(d)) return "-";

  const now = Date.now();
  const diffInSeconds = Math.floor((d - now) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60) {
    return locale === "fa" ? "همین الان" : "just now";
  }

  const rtf = new Intl.RelativeTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    numeric: "always",
  });

  const minutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");

  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");

  const days = Math.floor(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(days, "day");

  const months = Math.floor(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, "month");

  const years = Math.floor(days / 365);
  return rtf.format(years, "year");
};
