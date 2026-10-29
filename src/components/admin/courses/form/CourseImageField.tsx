"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { BookOpen, ImagePlus, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CourseImageFieldProps {
  currentImageUrl?: string | null;
  value?: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  invalid?: boolean;
}

export function CourseImageField({
  currentImageUrl,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  invalid = false,
}: CourseImageFieldProps) {
  const t = useTranslations("admin.courses.form");
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (preview && preview.file !== value) {
      URL.revokeObjectURL(preview.url);
      if (previewUrlRef.current === preview.url) {
        previewUrlRef.current = null;
      }
    }
  }, [preview, value]);

  const displayUrl =
    value instanceof File && preview?.file === value
      ? preview.url
      : currentImageUrl || "";

  const handleImageChange = (file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const url = file ? URL.createObjectURL(file) : null;
    previewUrlRef.current = url;
    setPreview(file && url ? { file, url } : null);
    onChange(file);
  };

  return (
    <Field data-invalid={invalid} className="gap-1.5">
      <FieldLabel
        htmlFor="course-image-file"
        className="text-xs font-bold text-foreground"
      >
        {t("imageLabel")}
      </FieldLabel>

      <div className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-muted/30">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-background shadow-md ring-2 ring-primary/20 bg-muted">
          {displayUrl ? (
            <Image
              src={displayUrl}
              alt="Course"
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
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
              aria-invalid={invalid}
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
                  handleImageChange(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="rounded-xl h-9 gap-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500/10 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t("removeImage")}</span>
              </Button>
            )}
          </div>
          <FieldDescription
            id="course-image-hint"
            className="text-xs font-semibold"
          >
            {t("imageHint")}
          </FieldDescription>
        </div>

        <input
          id="course-image-file"
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="sr-only"
          tabIndex={-1}
          disabled={disabled}
          onBlur={onBlur}
          aria-invalid={invalid}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            handleImageChange(file);
          }}
        />
      </div>

      {error && (
        <FieldError id="course-image-error" errors={[{ message: error }]} />
      )}
    </Field>
  );
}
