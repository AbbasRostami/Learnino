"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminCategories } from "@/services";
import type { Post } from "@/types";
import { Languages, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { TiptapEditor } from "./editor/TiptapEditor";
import { PostImageField } from "./PostImageField";
import { usePostForm } from "./usePostForm";

interface PostFormProps {
  post?: Post | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const t = useTranslations("admin.posts.form");

  const { form, isEdit, isPending, onSubmit, editorUploadFn } = usePostForm({
    post,
    onSuccess,
  });

  const { data: categoriesData } = useAdminCategories({ limit: 100 });
  const categories = categoriesData?.data?.items ?? [];
  const categoryOptions = categories?.map((c) => ({
    value: c?.id,
    label: c?.name,
  }));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-2">
      <FieldGroup>
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <PostImageField
              currentImageUrl={post?.imageUrl}
              value={(field.value as File | null) ?? null}
              onChange={field.onChange}
              disabled={isPending}
              invalid={fieldState.invalid}
              error={fieldState.error}
            />
          )}
        />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="categoryId" className="text-xs font-bold">
                {t("categoryLabel")} <span className="text-rose-500">*</span>
              </FieldLabel>
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger
                  id="categoryId"
                  className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder={t("categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="rounded-xl"
                >
                  <SelectGroup>
                    {categoryOptions?.map((opt) => (
                      <SelectItem
                        key={opt?.value}
                        value={opt?.value}
                        className="text-xs font-bold cursor-pointer"
                      >
                        {opt?.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Tabs defaultValue="fa" className="w-full p-2">
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
            <TabsTrigger value="fa" className="cursor-pointer">
              <Languages className="h-4 w-4" />
              <span>فارسی</span>
            </TabsTrigger>
            <TabsTrigger value="en" className="cursor-pointer">
              <Languages className="h-4 w-4" />
              <span>English</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fa" className="mt-4 flex flex-col gap-4">
            <Controller
              name="titleFa"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="titleFa" className="text-xs font-bold">
                    {t("titleFaLabel")} <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="titleFa"
                    placeholder={t("titleFaPlaceholder")}
                    className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
                    dir="rtl"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contentFa"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel className="text-xs font-bold">
                    {t("contentFaLabel")}{" "}
                    <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <TiptapEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    uploadFn={editorUploadFn}
                    placeholder={t("contentFaPlaceholder")}
                    dir="rtl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </TabsContent>

          <TabsContent value="en" className="mt-4 flex flex-col gap-4">
            <Controller
              name="titleEn"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel htmlFor="titleEn" className="text-xs font-bold">
                    {t("titleEnLabel")} <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="titleEn"
                    placeholder={t("titleEnPlaceholder")}
                    className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
                    dir="ltr"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contentEn"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel className="text-xs font-bold">
                    {t("contentEnLabel")}{" "}
                    <span className="text-rose-500">*</span>
                  </FieldLabel>
                  <TiptapEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    uploadFn={editorUploadFn}
                    placeholder={t("contentEnPlaceholder")}
                    dir="ltr"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </TabsContent>
        </Tabs>

        <Controller
          name="published"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex-row items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30"
            >
              <Switch
                id="published"
                name={field.name}
                checked={field.value}
                onBlur={field.onBlur}
                onCheckedChange={field.onChange}
                disabled={isPending}
                aria-invalid={fieldState.invalid}
              />
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <FieldLabel
                  htmlFor="published"
                  className="text-xs font-bold cursor-pointer"
                >
                  {t("publishedLabel")}
                </FieldLabel>
                <FieldDescription>{t("publishedDescription")}</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold cursor-pointer"
        >
          {t("cancel")}
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-xl h-10 text-xs font-bold gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-white"
        >
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          <span>{isEdit ? t("submitEdit") : t("submitCreate")}</span>
        </Button>
      </div>
    </form>
  );
}
