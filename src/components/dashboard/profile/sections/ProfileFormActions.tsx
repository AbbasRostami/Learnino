"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Save, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileFormActionsProps {
  isUpdating: boolean;
  isDirty: boolean;
  onDiscard: () => void;
}

export function ProfileFormActions({
  isUpdating,
  isDirty,
  onDiscard,
}: ProfileFormActionsProps) {
  const t = useTranslations("dashboard");

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        type="submit"
        disabled={isUpdating || !isDirty}
        className={cn(
          "rounded-xl h-11 text-xs font-black gap-2 cursor-pointer shadow-md transition-all",
          isDirty
            ? "bg-linear-to-r from-primary to-brand-accent hover:shadow-lg shadow-primary/20"
            : "opacity-50 cursor-not-allowed",
        )}
      >
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{t("saveChanges")}</span>
      </Button>

      {isDirty && (
        <Button
          type="button"
          variant="ghost"
          onClick={onDiscard}
          disabled={isUpdating}
          className="rounded-xl h-11 text-xs font-bold gap-2 cursor-pointer text-muted-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span>{t("discardChanges")}</span>
        </Button>
      )}

      {isDirty && (
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 ms-auto">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>{t("unsavedChanges")}</span>
        </span>
      )}
    </div>
  );
}
