"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 1.2;
const THEME_SWITCH_DELAY = 500;

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme, systemTheme } = useTheme();
  const t = useTranslations("theme");

  const [mounted, setMounted] = useState(false);
  const [animatingTheme, setAnimatingTheme] = useState<"light" | "dark" | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    const targetTheme =
      newTheme === "system"
        ? (systemTheme as "light" | "dark") || "light"
        : newTheme;

    if (targetTheme === resolvedTheme) {
      setTheme(newTheme);
      return;
    }

    setAnimatingTheme(targetTheme);

    setTimeout(() => {
      setTheme(newTheme);
    }, THEME_SWITCH_DELAY);

    setTimeout(() => {
      setAnimatingTheme(null);
    }, ANIMATION_DURATION * 1000);
  };

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full bg-accent/40 animate-pulse" />;
  }

  const isDarkTarget = animatingTheme === "dark";

  const animationPortal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {animatingTheme && (
              <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden flex">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: ["-100%", "0%", "0%", "-100%"] }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    times: [0, 0.42, 0.58, 1],
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`w-1/2 h-full border-e ${
                    isDarkTarget
                      ? "bg-slate-950 border-indigo-500/40 shadow-[10px_0_30px_rgba(99,102,241,0.25)]"
                      : "bg-slate-50 border-amber-500/40 shadow-[10px_0_30px_rgba(245,158,11,0.25)]"
                  }`}
                />

                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: ["100%", "0%", "0%", "100%"] }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    times: [0, 0.42, 0.58, 1],
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`w-1/2 h-full border-s ${
                    isDarkTarget
                      ? "bg-slate-950 border-indigo-500/40 shadow-[-10px_0_30px_rgba(99,102,241,0.25)]"
                      : "bg-slate-50 border-amber-500/40 shadow-[-10px_0_30px_rgba(245,158,11,0.25)]"
                  }`}
                />

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.3, 1.3, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    times: [0, 0.38, 0.62, 1],
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 m-auto h-20 w-20 rounded-full flex items-center justify-center bg-card border border-border shadow-2xl z-10"
                >
                  {isDarkTarget ? (
                    <Moon className="h-10 w-10 text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
                  ) : (
                    <Sun className="h-10 w-10 text-amber-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      {animationPortal}

      <DropdownMenu>
        <DropdownMenuTrigger
          className="h-9 w-9 rounded-full cursor-pointer relative hover:bg-accent/80 flex items-center justify-center transition-colors outline-none"
          aria-label={t("toggle")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 text-indigo-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            onClick={() => handleThemeChange("light")}
            className="cursor-pointer"
          >
            <Sun className="h-4 w-4 text-amber-500" />
            <span>{t("light")}</span>
            {theme === "light" && (
              <span className="ms-auto text-xs text-primary font-bold">✓</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleThemeChange("dark")}
            className="cursor-pointer"
          >
            <Moon className="h-4 w-4 text-indigo-400" />
            <span>{t("dark")}</span>
            {theme === "dark" && (
              <span className="ms-auto text-xs text-primary font-bold">✓</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleThemeChange("system")}
            className="cursor-pointer"
          >
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span>{t("system")}</span>
            {theme === "system" && (
              <span className="ms-auto text-xs text-primary font-bold">✓</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
