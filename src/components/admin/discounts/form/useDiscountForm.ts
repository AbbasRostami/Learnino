import {
  getCreateDiscountSchema,
  type CreateDiscountFormValues,
} from "@/schemas";
import { useCreateDiscount } from "@/services";
import type { DiscountType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface UseDiscountFormProps {
  onSuccess: () => void;
}

export function useDiscountForm({ onSuccess }: UseDiscountFormProps) {
  const tTypes = useTranslations("admin.discounts.types");
  const tDiscount = useTranslations("discount");

  const schema = getCreateDiscountSchema(tDiscount);

  const form = useForm<CreateDiscountFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      type: "PERCENTAGE",
      value: 10,
      maxUses: 100,
      expiresInDays: 30,
    },
  });

  const selectedType = form.watch("type");

  const { mutate: createDiscount, isPending } = useCreateDiscount({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const onSubmit = form.handleSubmit((data: CreateDiscountFormValues) => {
    createDiscount({
      code: data?.code,
      type: data?.type,
      value: data?.value,
      maxUses: data?.maxUses,
      expiresInDays: data?.expiresInDays,
    });
  });

  const typeOptions: { value: DiscountType; label: string }[] = [
    { value: "PERCENTAGE", label: tTypes("PERCENTAGE") },
    { value: "AMOUNT", label: tTypes("AMOUNT") },
  ];

  return {
    form,
    selectedType,
    typeOptions,
    isPending,
    onSubmit,
    tDiscount,
  };
}
