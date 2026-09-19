"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useLocale } from "next-intl";

export function Logo() {
  const locale = useLocale();
  const isFa = locale === "fa";

  return (
    <Link
      href="/"
      className="relative flex items-center h-12 w-36 shrink-0 transition-opacity hover:opacity-90"
      aria-label="Learnino"
    >
      <Image
        src={isFa ? "/logo/Farsi-Light.png" : "/logo/English-Light.png"}
        alt="Learnino"
        fill
        priority
        className="object-contain dark:hidden"
        sizes="144px"
      />
      <Image
        src={isFa ? "/logo/Farsi-Dark.png" : "/logo/English-Dark.png"}
        alt="Learnino"
        fill
        priority
        className="hidden object-contain dark:block"
        sizes="144px"
      />
    </Link>
  );
}