import type { useTranslations } from "next-intl";
import { z } from "zod";

type TeacherT = ReturnType<typeof useTranslations<"teacher">>;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const getAvatarSchema = (t: TeacherT) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_AVATAR_SIZE,
      t("validation.avatarMaxSize"),
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      t("validation.avatarInvalidType"),
    );

export const getCreateTeacherSchema = (t: TeacherT) =>
  z.object({
    nameFa: z
      .string()
      .trim()
      .min(2, t("validation.nameFaMin"))
      .max(100, t("validation.nameFaMax")),

    nameEn: z
      .string()
      .trim()
      .min(2, t("validation.nameEnMin"))
      .max(100, t("validation.nameEnMax")),

    bioFa: z
      .string()
      .trim()
      .max(2000, t("validation.bioMax"))
      .optional()
      .or(z.literal("")),

    bioEn: z
      .string()
      .trim()
      .max(2000, t("validation.bioMax"))
      .optional()
      .or(z.literal("")),

    show: z.boolean().optional().default(true),

    avatar: getAvatarSchema(t).optional().nullable(),
  });

export const getUpdateTeacherSchema = (t: TeacherT) =>
  z
    .object({
      nameFa: z
        .string()
        .trim()
        .min(2, t("validation.nameFaMin"))
        .max(100, t("validation.nameFaMax"))
        .optional()
        .or(z.literal("")),

      nameEn: z
        .string()
        .trim()
        .min(2, t("validation.nameEnMin"))
        .max(100, t("validation.nameEnMax"))
        .optional()
        .or(z.literal("")),

      bioFa: z
        .union([
          z.string().trim().max(2000, t("validation.bioMax")),
          z.null(),
          z.literal(""),
        ])
        .optional(),

      bioEn: z
        .union([
          z.string().trim().max(2000, t("validation.bioMax")),
          z.null(),
          z.literal(""),
        ])
        .optional(),

      avatar: getAvatarSchema(t).optional().nullable(),
    })
    .refine(
      (data) => {
        const hasNameFa = Boolean(data.nameFa && data.nameFa.length > 0);
        const hasNameEn = Boolean(data.nameEn && data.nameEn.length > 0);
        const hasBioFa = data.bioFa !== undefined;
        const hasBioEn = data.bioEn !== undefined;
        const hasAvatar = data.avatar instanceof File;

        return hasNameFa || hasNameEn || hasBioFa || hasBioEn || hasAvatar;
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["nameFa"],
      },
    );

export const getTeachersQuerySchema = (t: TeacherT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
  });

export const getTeacherUuidSchema = (t: TeacherT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });

export const getTeacherSlugSchema = (t: TeacherT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, t("validation.slugRequired"))
      .max(100, t("validation.slugMaxLength")),
  });
