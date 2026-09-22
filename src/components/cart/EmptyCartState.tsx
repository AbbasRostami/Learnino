"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyCartState() {
  const t = useTranslations("cart");

  return (
    <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-xl">
          <ShoppingCart className="h-12 w-12" aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
        {t("cartEmpty")}
      </h1>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
        {t("emptyCartDescription")}
      </p>

      <Button size="lg" className="rounded-full px-8 gap-2 shadow-lg">
        <Link href="/courses">
          <span>{t("browseCourses")}</span>
        </Link>
      </Button>
    </div>
  );
}
