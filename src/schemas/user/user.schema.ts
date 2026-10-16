import type { useTranslations } from "next-intl";
import { z } from "zod";

type UserT = ReturnType<typeof useTranslations<"user">>;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const IRAN_MOBILE_REGEX = /^09\d{9}$/;

export const getUpdateProfileSchema = (t: UserT) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(2, t("validation.nameMin"))
        .max(50, t("validation.nameMax"))
        .optional()
        .or(z.literal("")),

      phone: z
        .string()
        .trim()
        .regex(IRAN_MOBILE_REGEX, t("validation.phoneInvalid"))
        .optional()
        .or(z.literal("")),

      avatar: z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          t("validation.avatarMaxSize"),
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          t("validation.avatarInvalidType"),
        )
        .optional()
        .nullable(),
    })
    .refine(
      (data) => {
        return (
          Boolean(data.name && data.name.length > 0) ||
          Boolean(data.phone && data.phone.length > 0) ||
          data.avatar instanceof File
        );
      },
      {
        message: t("validation.atLeastOneField"),
        path: ["name"],
      },
    );

export const getListUsersSchema = (t: UserT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
    role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
    isVerified: z.enum(["true", "false"]).optional(),
    sortBy: z
      .enum(["createdAt", "name", "email"])
      .default("createdAt")
      .optional(),
    order: z.enum(["asc", "desc"]).default("desc").optional(),
  });

export const getBannedUsersSchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  });

export const getUuidSchema = (t: UserT) =>
  z.object({
    id: z.string().uuid(t("validation.invalidUuid")),
  });
