"use client";

import { FieldGroup } from "@/components/ui/field";
import type { UserProfile } from "@/types";
import { useProfileForm } from "../hooks/useProfileForm";
import { ProfileAvatarField } from "./ProfileAvatarField";
import { ProfileFormActions } from "./ProfileFormActions";
import { ProfileInfoFields } from "./ProfileInfoFields";

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const {
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
  } = useProfileForm({ profile });

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
      <form
        id="profile-form"
        onSubmit={form?.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FieldGroup>
          <ProfileAvatarField
            control={form.control}
            profile={profile}
            displayAvatar={displayAvatar}
            previewUrl={previewUrl}
            fileInputRef={fileInputRef}
            isDeleting={isDeleting}
            onAvatarChange={handleAvatarChange}
            onClearSelection={clearAvatarSelection}
            onDeleteAvatar={handleDeleteAvatar}
          />

          <hr className="border-dashed border-border/60" />

          <ProfileInfoFields control={form.control} profile={profile} />
        </FieldGroup>

        <hr className="border-dashed border-border/60" />

        <ProfileFormActions
          isUpdating={isUpdating}
          isDirty={isDirty}
          onDiscard={handleDiscard}
        />
      </form>
    </div>
  );
}
