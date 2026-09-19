import type { useTranslations } from "next-intl";
import { z } from "zod";

type AuthT = ReturnType<typeof useTranslations<"auth">>;

const getEmailSchema = (t: AuthT) =>
  z
    .string()
    .trim()
    .min(1, t("validation.emailRequired"))
    .email(t("validation.emailInvalid"));

const getPasswordSchema = (t: AuthT) =>
  z
    .string()
    .min(1, t("validation.passwordRequired"))
    .min(6, t("validation.passwordMin"));

const getOtpSchema = (t: AuthT) =>
  z
    .string()
    .trim()
    .min(1, t("validation.otpRequired"))
    .length(6, t("validation.otpLength"))
    .regex(/^\d{6}$/, t("validation.otpLength"));

export const getRegisterSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
    password: getPasswordSchema(t),
    name: z.string().trim().optional(),
  });

export const getVerifyEmailSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
    code: getOtpSchema(t),
  });

export const getLoginSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
    password: z.string().min(1, t("validation.passwordRequired")),
  });

export const getForgotPasswordSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
  });

export const getResetPasswordSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
    code: getOtpSchema(t),
    newPassword: getPasswordSchema(t),
  });

export const getResendVerificationSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
  });

export const getResendResetCodeSchema = (t: AuthT) =>
  z.object({
    email: getEmailSchema(t),
  });

export const getChangePasswordSchema = (t: AuthT) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, t("validation.currentPasswordRequired")),
      newPassword: getPasswordSchema(t),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: t("validation.newPasswordSameAsCurrent"),
      path: ["newPassword"],
    });

export const getRequestChangeEmailSchema = (t: AuthT) =>
  z.object({
    newEmail: getEmailSchema(t),
    password: z.string().min(1, t("validation.passwordRequired")),
  });

export const getVerifyChangeEmailSchema = (t: AuthT) =>
  z.object({
    code: getOtpSchema(t),
  });
