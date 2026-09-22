"use client";

import { useLocale } from "@/hooks/useLocale";
import { Link } from "@/i18n/routing";
import { getCategoryStyle } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types";
import { BookOpen, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  isRemoving: boolean;
}

export function CartItemCard({
  item,
  onRemove,
  isRemoving,
}: CartItemCardProps) {
  const t = useTranslations("course");
  const locale = useLocale();
  const style = getCategoryStyle(item?.category?.slug);

  return (
    <div className="group relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs hover:shadow-md transition-all hover:border-primary/30">
      <Link
        href={`/courses/${item?.slug}`}
        className="relative aspect-16/10 w-full sm:w-40 shrink-0 overflow-hidden rounded-2xl bg-muted"
      >
        {item?.imageUrl ? (
          <Image
            src={item?.imageUrl}
            alt={item?.title}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <BookOpen className="h-6 w-6 text-muted-foreground/30" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between min-w-0 w-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            {item?.category && (
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
                  style.badgeColor,
                )}
              >
                {item?.category?.name}
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {t(`levels.${item?.level?.toUpperCase()}`)}
            </span>
          </div>

          <h3 className="text-base font-bold text-foreground line-clamp-2 hover:text-primary transition-colors">
            <Link href={`/courses/${item?.slug}`}>{item?.title}</Link>
          </h3>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-border/60">
          <button
            type="button"
            onClick={onRemove}
            disabled={isRemoving}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer disabled:opacity-50"
            aria-label={t("removeItem")}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="font-semibold">{t("removeItem")}</span>{" "}
          </button>

          <div className="text-end" dir="ltr">
            <span className="text-lg font-black text-foreground">
              {new Intl.NumberFormat(
                locale === "fa" ? "fa-IR" : "en-US",
              ).format(item?.price)}
            </span>
            <span className="text-[10px] text-muted-foreground ms-1">
              {t("currency")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
