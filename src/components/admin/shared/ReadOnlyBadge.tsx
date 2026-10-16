"use client";

import { cn } from "@/lib/utils";
import { useProfile } from "@/services";
import { Eye, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReadOnlyBadgeProps {
  className?: string;
  showIcon?: boolean;
}

export function ReadOnlyBadge({
  className,
  showIcon = true,
}: ReadOnlyBadgeProps) {
  const { data } = useProfile();
  const t = useTranslations("admin.permission");

  const role = data?.data?.profile?.role;

  if (!role || (role !== "ADMIN" && role !== "SUPER_ADMIN")) return null;

  const isSuper = role === "SUPER_ADMIN";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black border whitespace-nowrap",
        isSuper
          ? "bg-primary/10 text-primary border-primary/30"
          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        className,
      )}
    >
      {showIcon &&
        (isSuper ? (
          <ShieldCheck className="h-3 w-3" />
        ) : (
          <Eye className="h-3 w-3" />
        ))}
      <span>{isSuper ? t("superAdmin") : t("readOnlyAdmin")}</span>
    </span>
  );
}
