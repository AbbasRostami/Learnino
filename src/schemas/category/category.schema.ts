import type { useTranslations } from "next-intl";
import { z } from "zod";

type CategoryT = ReturnType<typeof useTranslations<"category">>;

export const getCreateCategorySchema = (t: CategoryT) =>
  z.object({
    nameFa: z
      .string()
      .trim()
      .min(2, { message: t("validation.nameFaMin") })
      .max(50, { message: t("validation.nameFaMax") }),

    nameEn: z
      .string()
      .trim()
      .min(2, { message: t("validation.nameEnMin") })
      .max(50, { message: t("validation.nameEnMax") }),

    descriptionFa: z
      .string()
      .trim()
      .max(500, { message: t("validation.descriptionMax") })
      .optional()
      .or(z.literal("")),

    descriptionEn: z
      .string()
      .trim()
      .max(500, { message: t("validation.descriptionMax") })
      .optional()
      .or(z.literal("")),

    show: z.boolean().default(true),
  });

export const getUpdateCategorySchema = (t: CategoryT) =>
  z
    .object({
      nameFa: z
        .string()
        .trim()
        .max(50, { message: t("validation.nameFaMax") })
        .optional()
        .or(z.literal("")),

      nameEn: z
        .string()
        .trim()
        .max(50, { message: t("validation.nameEnMax") })
        .optional()
        .or(z.literal("")),

      descriptionFa: z
        .string()
        .trim()
        .max(500, { message: t("validation.descriptionMax") })
        .optional()
        .or(z.literal("")),

      descriptionEn: z
        .string()
        .trim()
        .max(500, { message: t("validation.descriptionMax") })
        .optional()
        .or(z.literal("")),
    })
    .superRefine((data, ctx) => {
      if (
        data?.nameFa &&
        data.nameFa.trim().length > 0 &&
        data.nameFa.trim().length < 2
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.nameFaMin"),
          path: ["nameFa"],
        });
      }
      if (
        data?.nameEn &&
        data.nameEn.trim().length > 0 &&
        data.nameEn.trim().length < 2
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("validation.nameEnMin"),
          path: ["nameEn"],
        });
      }
    })
    .refine(
      (data) => {
        const hasNameFa = Boolean(
          data?.nameFa && data.nameFa.trim().length > 0,
        );
        const hasNameEn = Boolean(
          data?.nameEn && data.nameEn.trim().length > 0,
        );
        const hasDescFa = Boolean(
          data?.descriptionFa && data.descriptionFa.trim().length > 0,
        );
        const hasDescEn = Boolean(
          data?.descriptionEn && data.descriptionEn.trim().length > 0,
        );

        return hasNameFa || hasNameEn || hasDescFa || hasDescEn;
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["nameFa"],
      },
    );

export type CreateCategorySchemaType = ReturnType<
  typeof getCreateCategorySchema
>;
export type CreateCategoryFormValues = z.infer<CreateCategorySchemaType>;

export type UpdateCategorySchemaType = ReturnType<
  typeof getUpdateCategorySchema
>;
export type UpdateCategoryFormValues = z.infer<UpdateCategorySchemaType>;
