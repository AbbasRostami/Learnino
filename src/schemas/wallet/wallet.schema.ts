import type { useTranslations } from "next-intl";
import { z } from "zod";

type WalletT = ReturnType<typeof useTranslations<"wallet">>;

export const getChargeWalletSchema = (t: WalletT) =>
  z.object({
    amount: z.coerce
      .number({ message: t("validation.amountInvalid") })
      .int(t("validation.amountInt"))
      .min(10000, t("validation.amountMin"))
      .max(500_000_000, t("validation.amountMax")),
  });

export const getTransactionsQuerySchema = () =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED", "CANCELLED"]).optional(),
    type: z.enum(["CHARGE", "PURCHASE", "REFUND"]).optional(),
  });

export const getAdminWalletsQuerySchema = (t: WalletT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
    minBalance: z.coerce.number().min(0).optional(),
    maxBalance: z.coerce.number().min(0).optional(),
    search: z
      .string()
      .trim()
      .max(100, t("validation.searchMaxLength"))
      .optional(),
  });

export const getAdminTransactionsQuerySchema = (t: WalletT) =>
  z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED", "CANCELLED"]).optional(),
    type: z.enum(["CHARGE", "PURCHASE", "REFUND"]).optional(),
    userId: z.string().uuid(t("validation.invalidUserUuid")).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  });
