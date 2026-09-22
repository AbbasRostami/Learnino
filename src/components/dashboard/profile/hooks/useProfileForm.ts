"use client";

import { getUpdateProfileSchema } from "@/schemas";
import { useDeleteAvatar, useUpdateProfile } from "@/services";
import type { UserProfile } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export type ProfileFormValues = z.infer<
  ReturnType<typeof getUpdateProfileSchema>
>;

interface UseProfileFormOptions {
  profile: UserProfile | undefined;
}

export function useProfileForm({ profile }: UseProfileFormOptions) {
  const t = useTranslations("dashboard");
  const tUser = useTranslations("user");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteAvatar, isPending: isDeleting } = useDeleteAvatar();

  const schema = getUpdateProfileSchema(tUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      avatar: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (profile) {
      form?.reset({
        name: profile?.name || "",
        phone: profile?.phone || "",
        avatar: null,
      });
    }
  }, [profile, form]);

  const nameValue = form?.watch("name");
  const phoneValue = form?.watch("phone");
  const avatarValue = form?.watch("avatar");

  const isDirty =
    (nameValue && nameValue !== (profile?.name || "")) ||
    (phoneValue && phoneValue !== (profile?.phone || "")) ||
    avatarValue instanceof File;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      form?.setValue("avatar", file, { shouldValidate: true });
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const clearAvatarSelection = () => {
    form?.setValue("avatar", null, { shouldValidate: true });
    setPreviewUrl(null);
    if (fileInputRef?.current) fileInputRef.current.value = "";
  };

  const handleDeleteAvatar = () => {
    deleteAvatar();
    clearAvatarSelection();
  };

  const handleDiscard = () => {
    if (profile) {
      form?.reset({
        name: profile?.name || "",
        phone: profile?.phone || "",
        avatar: null,
      });
      clearAvatarSelection();
    }
  };

  const onSubmit = (values: ProfileFormValues) => {
    const payload: Record<string, unknown> = {};

    if (values?.name && values?.name !== profile?.name) {
      payload.name = values.name;
    }
    if (values?.phone && values?.phone !== profile?.phone) {
      payload.phone = values.phone;
    }
    if (values?.avatar instanceof File) {
      payload.avatar = values.avatar;
    }

    if (Object.keys(payload)?.length === 0) {
      toast.info(t("noChangesToSave"));
      return;
    }

    updateProfile(payload, {
      onSuccess: () => clearAvatarSelection(),
    });
  };

  const displayAvatar = previewUrl || profile?.avatar;

  return {
    form,
    previewUrl,
    fileInputRef,
    isUpdating,
    isDeleting,
    isDirty,
    displayAvatar,
    handleAvatarChange,
    clearAvatarSelection,
    handleDeleteAvatar,
    handleDiscard,
    onSubmit,
  };
}
