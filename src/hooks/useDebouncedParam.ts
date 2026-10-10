import { useEffect, useRef, useState } from "react";

export function useDebouncedParam(
  paramValue: string,
  onUpdate: (value: string | null) => void,
  delay = 400,
) {
  const [value, setValue] = useState(paramValue);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  });

  useEffect(() => {
    setValue(paramValue);
  }, [paramValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== paramValue) {
        onUpdateRef.current(value || null);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, paramValue, delay]);

  return [value, setValue] as const;
}
