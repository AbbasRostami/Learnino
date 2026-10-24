"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({
  title,
  subtitle,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-2xl shadow-xs",
            iconColor,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-black text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
