export function objectToFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (typeof value === "boolean") {
      formData.append(
        key,
        new Blob([JSON.stringify(value)], { type: "application/json" }),
      );
      return;
    }

    formData.append(key, String(value).trim());
  });

  return formData;
}
