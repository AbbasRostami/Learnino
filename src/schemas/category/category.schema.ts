import type { useTranslations } from "next-intl";
import { z } from "zod";

type CategoryT = ReturnType<typeof useTranslations<"category">>;

export const getCreateCategorySchema = (t: CategoryT) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, t("validation.nameMin"))
      .max(50, t("validation.nameMax")),

    description: z
      .string()
      .trim()
      .max(500, t("validation.descriptionMax"))
      .optional()
      .or(z.literal("")),

    show: z.boolean().optional().default(true),
  });

export const getUpdateCategorySchema = (t: CategoryT) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(2, t("validation.nameMin"))
        .max(50, t("validation.nameMax"))
        .optional()
        .or(z.literal("")),

      description: z
        .string()
        .trim()
        .max(500, t("validation.descriptionMax"))
        .optional()
        .or(z.literal("")),
    })
    .refine(
      (data) => {
        const hasName = Boolean(data.name && data.name.length > 0);
        const hasDescription =
          data.description !== undefined && data.description !== null;
        return hasName || hasDescription;
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["name"],
      },
    );

export const getToggleVisibilitySchema = (t: CategoryT) =>
  z.object({
    show: z.boolean({
      error: (issue) =>
        issue.input === undefined
          ? t("validation.showRequired")
          : t("validation.showInvalid"),
    }),
  });

export const getAdminCategoriesSchema = (t: CategoryT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    show: z.enum(["true", "false"]).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
  });

export const getCategoryUuidSchema = (t: CategoryT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });

export const getCategorySlugSchema = (t: CategoryT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, t("validation.slugRequired"))
      .max(100, t("validation.slugMaxLength")),
  });
