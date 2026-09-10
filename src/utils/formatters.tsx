import { toJalaali } from "jalaali-js";

// ─── فرمت واحد پول ───
export const formatCurrency = (amount?: number | null, locale = "fa-IR") =>
  amount != null ? new Intl.NumberFormat(locale).format(amount) : "-";

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const WEEKDAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
] as const;

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

type JalaaliResult = {
  jy: number;
  jm: number;
  jd: number;
};

const formatMap = {
  jYYYY: (d: JalaaliResult) => d.jy,
  jMM: (d: JalaaliResult) => pad(d.jm),
  jDD: (d: JalaaliResult) => pad(d.jd),

  jMMMM: (d: JalaaliResult) => JALALI_MONTHS[d.jm - 1],

  HH: (d: Date) => pad(d.getHours()),
  mm: (d: Date) => pad(d.getMinutes()),
  ss: (d: Date) => pad(d.getSeconds()),
};

// ─── فرمت تاریخ شمسی ───
export const formatJalaliDate = (
  date: string | Date,
  format = "jYYYY/jMM/jDD - HH:mm",
) => {
  if (!date) return "-";

  const d = new Date(date);
  const j = toJalaali(d); // ✅ استفاده مستقیم از toJalaali

  return format
    .replace("jYYYY", String(formatMap.jYYYY(j)))
    .replace("jMMMM", formatMap.jMMMM(j))
    .replace("jMM", formatMap.jMM(j))
    .replace("jDD", formatMap.jDD(j))
    .replace("HH", formatMap.HH(d))
    .replace("mm", formatMap.mm(d))
    .replace("ss", formatMap.ss(d));
};

// ─── فرمت ساعت ───
export const formatTime = (time?: string): string => {
  if (!time) return "";

  const parts = time.split(":");
  return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : time;
};

// ─── زمان نسبی (Relative Time) ───
export const formatRelativeTime = (date: string | Date): string => {
  if (!date) return "-";

  const now = Date.now();
  const d = new Date(date).getTime();

  const diff = now - d;

  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < minute) return "همین الان";
  if (diff < hour) return `${Math.floor(diff / minute)} دقیقه پیش`;
  if (diff < day) return `${Math.floor(diff / hour)} ساعت پیش`;
  if (diff < week) return `${Math.floor(diff / day)} روز پیش`;
  if (diff < 30 * day) return `${Math.floor(diff / week)} هفته پیش`;

  return formatJalaliDate(date, "jYYYY/jMM/jDD");
};
