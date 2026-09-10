// hooks/useLocale.ts
"use client";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";

export const useLocale = (): Locale => {
  const params = useParams();
  return (params?.locale as Locale) || "fa";
};
