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
    .custom<File | null | undefined>()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_AVATAR_SIZE),
      { message: t("validation.avatarMaxSize") },
    )
    .refine(
      (file) =>
        !file ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: t("validation.avatarInvalidType") },
    );

export const getCreateTeacherSchema = (t: TeacherT) =>
  z.object({
    nameFa: z
      .string()
      .trim()
      .min(2, { message: t("validation.nameFaMin") })
      .max(100, { message: t("validation.nameFaMax") }),

    nameEn: z
      .string()
      .trim()
      .min(2, { message: t("validation.nameEnMin") })
      .max(100, { message: t("validation.nameEnMax") }),

    bioFa: z
      .string()
      .trim()
      .max(2000, { message: t("validation.bioMax") })
      .optional()
      .or(z.literal("")),

    bioEn: z
      .string()
      .trim()
      .max(2000, { message: t("validation.bioMax") })
      .optional()
      .or(z.literal("")),

    show: z.boolean().default(true),

    avatar: getAvatarSchema(t).optional().nullable(),
  });

export const getUpdateTeacherSchema = (t: TeacherT) =>
  z
    .object({
      nameFa: z
        .string()
        .trim()
        .refine((val) => val === "" || val.length >= 2, {
          message: t("validation.nameFaMin"),
        })
        .refine((val) => val.length <= 100, {
          message: t("validation.nameFaMax"),
        })
        .optional(),

      nameEn: z
        .string()
        .trim()
        .refine((val) => val === "" || val.length >= 2, {
          message: t("validation.nameEnMin"),
        })
        .refine((val) => val.length <= 100, {
          message: t("validation.nameEnMax"),
        })
        .optional(),

      bioFa: z
        .string()
        .trim()
        .refine((val) => val === "" || val.length <= 2000, {
          message: t("validation.bioMax"),
        })
        .optional()
        .nullable(),

      bioEn: z
        .string()
        .trim()
        .refine((val) => val === "" || val.length <= 2000, {
          message: t("validation.bioMax"),
        })
        .optional()
        .nullable(),

      avatar: getAvatarSchema(t).optional().nullable(),
    })
    .refine(
      (data) => {
        const hasNameFa = Boolean(
          data?.nameFa && data.nameFa.trim().length > 0,
        );
        const hasNameEn = Boolean(
          data?.nameEn && data.nameEn.trim().length > 0,
        );
        const hasBioFa = Boolean(data?.bioFa && data.bioFa.trim().length > 0);
        const hasBioEn = Boolean(data?.bioEn && data.bioEn.trim().length > 0);
        const hasAvatar = data?.avatar instanceof File;

        return hasNameFa || hasNameEn || hasBioFa || hasBioEn || hasAvatar;
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["nameFa"],
      },
    );

export type CreateTeacherSchemaType = ReturnType<typeof getCreateTeacherSchema>;
export type CreateTeacherFormValues = z.infer<CreateTeacherSchemaType>;

export type UpdateTeacherSchemaType = ReturnType<typeof getUpdateTeacherSchema>;
export type UpdateTeacherFormValues = z.infer<UpdateTeacherSchemaType>;

export const getTeachersQuerySchema = (t: TeacherT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    search: z
      .string()
      .trim()
      .max(100, { message: t("validation.searchMaxLength") })
      .optional(),
  });

export const getTeacherUuidSchema = (t: TeacherT) =>
  z.object({
    id: z.string().uuid({ message: t("validation.invalidUuid") }),
  });

export const getTeacherSlugSchema = (t: TeacherT) =>
  z.object({
    slug: z
      .string()
      .trim()
      .min(1, { message: t("validation.slugRequired") })
      .max(100, { message: t("validation.slugMaxLength") }),
  });
