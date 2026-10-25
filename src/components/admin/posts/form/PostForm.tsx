"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { data: categoriesData } = useAdminCategories({ limit: 100 });
  const categories = categoriesData?.data?.items ?? [];
  const categoryOptions = categories?.map((c) => ({
    value: c?.id,
    label: c?.name,
  }));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-2" noValidate>
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <PostImageField
            currentImageUrl={post?.imageUrl}
            value={(field.value as File | null) ?? null}
            onChange={field.onChange}
            disabled={isPending}
            error={errors.image?.message}
          />
        )}
      />

      <div className="space-y-1.5">
        <Label className="text-xs font-bold">{t("categoryLabel")}</Label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select
              items={[
                { value: "", label: t("categoryPlaceholder") },
                ...categoryOptions,
              ]}
              value={field?.value || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className="h-11 w-full rounded-xl text-xs font-bold bg-background border-border/60"
                aria-invalid={!!errors?.categoryId}
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
          )}
        />
        {errors?.categoryId && (
          <span className="text-xs font-bold text-rose-500">
            {errors?.categoryId?.message}
          </span>
        )}
      </div>

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
          <div className="space-y-1.5">
            <Label htmlFor="titleFa" className="text-xs font-bold">
              {t("titleFaLabel")}
            </Label>
            <Input
              id="titleFa"
              {...register("titleFa")}
              placeholder={t("titleFaPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="rtl"
              disabled={isPending}
              aria-invalid={!!errors?.titleFa}
            />
            {errors?.titleFa && (
              <span className="text-xs font-bold text-rose-500">
                {errors?.titleFa?.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">{t("contentFaLabel")}</Label>
            <Controller
              control={control}
              name="contentFa"
              render={({ field }) => (
                <TiptapEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  uploadFn={editorUploadFn}
                  placeholder={t("contentFaPlaceholder")}
                  dir="rtl"
                />
              )}
            />
            {errors?.contentFa && (
              <span className="text-xs font-bold text-rose-500">
                {errors?.contentFa?.message}
              </span>
            )}
          </div>
        </TabsContent>

        <TabsContent value="en" className="mt-4 flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="titleEn" className="text-xs font-bold">
              {t("titleEnLabel")}
            </Label>
            <Input
              id="titleEn"
              {...register("titleEn")}
              placeholder={t("titleEnPlaceholder")}
              className="h-11 rounded-xl text-xs font-semibold bg-background border-border/60"
              dir="ltr"
              disabled={isPending}
              aria-invalid={!!errors?.titleEn}
            />
            {errors?.titleEn && (
              <span className="text-xs font-bold text-rose-500">
                {errors?.titleEn?.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">{t("contentEnLabel")}</Label>
            <Controller
              control={control}
              name="contentEn"
              render={({ field }) => (
                <TiptapEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  uploadFn={editorUploadFn}
                  placeholder={t("contentEnPlaceholder")}
                  dir="ltr"
                />
              )}
            />
            {errors?.contentEn && (
              <span className="text-xs font-bold text-rose-500">
                {errors?.contentEn?.message}
              </span>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-start gap-3 p-3 rounded-2xl border border-border/50 bg-muted/30">
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <Switch
              id="published"
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <Label
            htmlFor="published"
            className="text-xs font-bold cursor-pointer"
          >
            {t("publishedLabel")}
          </Label>
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            {t("publishedDescription")}
          </p>
        </div>
      </div>

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
