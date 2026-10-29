"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FileText, ImagePlus, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FieldError as RHFFieldError } from "react-hook-form";

interface PostImageFieldProps {
  currentImageUrl?: string | null;
  value?: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  invalid?: boolean;
  error?: RHFFieldError;
}

export function PostImageField({
  currentImageUrl,
  value,
  onChange,
  disabled,
  invalid,
  error,
}: PostImageFieldProps) {
  const t = useTranslations("admin.posts.form");
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

  const displayUrl = preview || currentImageUrl || "";

  return (
    <Field data-invalid={invalid}>
      <FieldLabel className="text-xs font-bold">{t("imageLabel")}</FieldLabel>

      <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-muted/30">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-background shadow-md ring-2 ring-primary/20 bg-muted">
          {displayUrl ? (
            <Image
              src={displayUrl}
              alt="Post"
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground/40" />
            </div>
          )}
        </div>

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
                  <span>{t("uploadImage")}</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-3.5 w-3.5" />
                  <span>{t("uploadImage")}</span>
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
                <span>{t("removeImage")}</span>
              </Button>
            )}
          </div>
          <FieldDescription>{t("imageHint")}</FieldDescription>
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

      {invalid && error && <FieldError errors={[error]} />}
    </Field>
  );
}
