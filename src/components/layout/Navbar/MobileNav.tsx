"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const navLinks = [
  { key: "courses", href: "/courses" },
  { key: "learningPaths", href: "/learning-paths" },
  { key: "blog", href: "/blog" },
  { key: "aboutUs", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const sheetSide = locale === "fa" ? "right" : "left";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full cursor-pointer lg:hidden"
            aria-label={t("menu")}
          >
            <Menu className="h-6 w-6" />
          </Button>
        }
      />
      <SheetContent
        side={sheetSide}
        className="w-80 p-0 flex flex-col [&>button]:hidden"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-xl transition-all flex items-center",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-accent",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <Separator />

        <div className="p-4 text-xs text-center text-muted-foreground">
          © {year ?? 2026} Learnino
        </div>
      </SheetContent>
    </Sheet>
  );
}
