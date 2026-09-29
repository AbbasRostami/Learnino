"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface TeacherAvatarFieldProps {
  currentAvatarUrl?: string | null;
  fallbackName?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  error?: string;
}

export function TeacherAvatarField({
  currentAvatarUrl,
  fallbackName,
  value,
  onChange,
  disabled,
  error,
}: TeacherAvatarFieldProps) {
  const t = useTranslations("admin.teachers.form");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [value]);

  const displayUrl = preview || currentAvatarUrl || "";
  const initial = (fallbackName || "?").charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-foreground">
        {t("avatarLabel")}
      </label>

      <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-muted/30">
        <Avatar className="h-20 w-20 border-2 border-background shadow-md ring-2 ring-primary/20 shrink-0">
          <AvatarImage src={displayUrl} alt={fallbackName || ""} />
          <AvatarFallback className="bg-linear-to-br from-primary to-brand-accent text-white text-xl font-black">
            {initial}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="rounded-xl h-9 gap-1.5 text-xs font-bold cursor-pointer"
            >
              {displayUrl ? (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  <span>{t("uploadAvatar")}</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-3.5 w-3.5" />
                  <span>{t("uploadAvatar")}</span>
                </>
              )}
            </Button>

            {value instanceof File && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() => {
                  onChange(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="rounded-xl h-9 gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500/10 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t("removeAvatar")}</span>
              </Button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground font-semibold">
            {t("avatarHint")}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          hidden
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onChange(file);
          }}
        />
      </div>

      {error && (
        <span className={cn("text-[10px] font-bold text-rose-500")}>
          {error}
        </span>
      )}
    </div>
  );
}