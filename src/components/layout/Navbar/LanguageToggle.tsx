"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useTransition } from "react";

export function LanguageToggle() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale as "fa" | "en" });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="h-9 w-9 rounded-full cursor-pointer hover:bg-accent/80 flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={t("toggle")}
        disabled={isPending}
      >
        <Languages className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleLocaleChange}
        >
          <DropdownMenuRadioItem value="fa" className="cursor-pointer gap-2.5">
            <Image
              src="/flag/Iran.svg"
              alt="Iran Flag"
              width={32}
              height={24}
              className="h-5 w-7 shrink-0 rounded-[3px] object-cover shadow-xs border border-black/10"
            />
            <span>{t("fa")}</span>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="en" className="cursor-pointer gap-2.5">
            <Image
              src="/flag/unitedkingdom.svg"
              alt="UK Flag"
              width={32}
              height={24}
              className="h-5 w-7 shrink-0 rounded-[3px] object-cover shadow-xs border border-black/10"
            />
            <span>{t("en")}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}