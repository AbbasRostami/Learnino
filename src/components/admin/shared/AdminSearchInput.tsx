"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "جستجو...",
  debounceMs = 500,
  className,
}: AdminSearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none right-3.5 ltr:left-3.5 ltr:right-auto"
        aria-hidden="true"
      />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl pr-10 ltr:pl-10 text-xs font-bold bg-background border-border/60 placeholder:font-semibold"
      />
      {inputValue && (
        <button
          type="button"
          onClick={() => {
            setInputValue("");
            onChange("");
          }}
          className="absolute top-1/2 -translate-y-1/2 left-3 ltr:right-3 ltr:left-auto h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground cursor-pointer transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
