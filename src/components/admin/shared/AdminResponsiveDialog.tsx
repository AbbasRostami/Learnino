"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AdminResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function AdminResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  children,
  className,
}: AdminResponsiveDialogProps) {
  const isMobile = useIsMobile();

  const HeaderIcon = Icon;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className={cn(
            "rounded-t-3xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl max-h-[95vh] overflow-y-auto p-5",
            className,
          )}
        >
          <SheetHeader className="text-start mb-4 space-y-0">
            <div className="flex items-center gap-3">
              {HeaderIcon && (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
                  <HeaderIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              )}
              <div className="flex flex-col text-start min-w-0">
                <SheetTitle className="text-lg font-black text-foreground truncate">
                  {title}
                </SheetTitle>
                {description && (
                  <SheetDescription className="text-xs leading-relaxed text-muted-foreground font-semibold">
                    {description}
                  </SheetDescription>
                )}
              </div>
            </div>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "rounded-3xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto p-6 sm:max-w-2xl no-scrollbar",
          className,
        )}
      >
        <DialogHeader className="space-y-0 mb-2">
          <div className="flex items-center gap-3">
            {HeaderIcon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
                <HeaderIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
            <div className="flex flex-col text-start min-w-0">
              <DialogTitle className="text-lg font-black text-foreground truncate">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-xs leading-relaxed text-muted-foreground font-semibold">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
