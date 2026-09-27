"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader2, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ConfirmDialogVariant =
  | "destructive"
  | "success"
  | "warning"
  | "info";

interface AdminConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending?: boolean;
  variant?: ConfirmDialogVariant;
  icon?: LucideIcon;
}

export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  isPending = false,
  variant = "info",
  icon: Icon,
}: AdminConfirmDialogProps) {
  const variantStyles = {
    destructive: {
      iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      actionBtn:
        "bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800 text-white focus:ring-rose-500",
    },
    success: {
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      actionBtn:
        "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white focus:ring-emerald-500",
    },
    warning: {
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      actionBtn:
        "bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white focus:ring-amber-500",
    },
    info: {
      iconBg: "bg-primary/10 text-primary",
      actionBtn: "bg-primary hover:bg-primary/90 text-white focus:ring-primary",
    },
  }[variant];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl max-w-md border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-xs transition-transform",
                  variantStyles.iconBg,
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
            <AlertDialogTitle className="text-lg font-black text-foreground">
              {title}
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-1 mt-4">
          <AlertDialogCancel
            className="rounded-xl cursor-pointer h-10 text-xs font-bold"
            disabled={isPending}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "rounded-xl cursor-pointer h-10 text-xs font-bold gap-2 shadow-xs transition-colors focus:ring-2 focus:ring-offset-2",
              variantStyles.actionBtn,
            )}
            onClick={(e) => {
              e.preventDefault();
              onConfirm(e);
            }}
            disabled={isPending}
          >
            {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{confirmLabel}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
