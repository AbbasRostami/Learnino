import { getCreatePostSchema, type CreatePostFormValues } from "@/schemas";
import { useCreatePost, useUpdatePost, useUploadEditorImage } from "@/services";
import type { Post } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, type Resolver } from "react-hook-form";

interface UsePostFormProps {
  post?: Post | null;
  onSuccess: () => void;
}

export function usePostForm({ post, onSuccess }: UsePostFormProps) {
  const tPost = useTranslations("post");
  const isEdit = Boolean(post);

  const schema = getCreatePostSchema(tPost);

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(schema) as Resolver<CreatePostFormValues>,
    mode: "onChange",
    values: {
      titleFa: post?.titleFa || "",
      titleEn: post?.titleEn || "",
      contentFa: post?.contentFa || "",
      contentEn: post?.contentEn || "",
      categoryId: post?.category?.id || "",
      published: post?.published ?? false,
      image: null,
    },
  });

  const { mutateAsync: uploadEditorImage } = useUploadEditorImage({});

  const editorUploadFn = async (file: File): Promise<string | null> => {
    try {
      const result = await uploadEditorImage({ image: file });
      return result?.data?.url ?? null;
    } catch {
      return null;
    }
  };

  const { mutate: createPost, isPending: isCreating } = useCreatePost({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost({
    onSuccessCallback: () => {
      onSuccess();
      form.reset();
    },
  });

  const isPending = isCreating || isUpdating;

  const handleFormSubmit = (data: CreatePostFormValues) => {
    if (isEdit && post) {
      updatePost({
        id: post.id,
        ...data,
      });
    } else {
      createPost(data);
    }
  };

  const onSubmit = form.handleSubmit(handleFormSubmit);

  return {
    form,
    isEdit,
    isPending,
    onSubmit,
    editorUploadFn,
  };
}
