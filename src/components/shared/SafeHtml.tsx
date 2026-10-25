"use client";

import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  itemProp?: string;
}

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "del",
  "mark",
  "sub",
  "sup",
  "small",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "img",
  "hr",
  "div",
  "span",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "label",
  "input",
  "figure",
  "figcaption",
];

const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "title",
  "width",
  "height",
  "loading",
  "class",
  "id",
  "style",
  "dir",
  "lang",
  "colspan",
  "rowspan",
  "align",
  "data-type",
  "data-id",
  "data-checked",
  "data-node-type",
  "type",
  "checked",
  "disabled",
];

const SANITIZE_CONFIG = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  KEEP_CONTENT: true,
  SAFE_FOR_TEMPLATES: false,
  ADD_ATTR: ["target", "rel"],
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
  FORBID_ATTR: [
    "onerror",
    "onload",
    "onclick",
    "onmouseover",
    "onfocus",
    "onblur",
    "onchange",
    "onsubmit",
    "formaction",
  ],
};

export function SafeHtml({
  html,
  className,
  as: Component = "div",
  itemProp,
}: SafeHtmlProps) {
  if (!html || typeof html !== "string") return null;

  const [sanitizedHtml, setSanitizedHtml] = useState<string>(html);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const clean = DOMPurify.sanitize(html, SANITIZE_CONFIG);
      setSanitizedHtml(clean);
    }
  }, [html]);

  return (
    <Component
      className={className}
      itemProp={itemProp}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      suppressHydrationWarning
    />
  );
}

export function stripHtml(html: string, maxLength?: number): string {
  if (!html || typeof html !== "string") return "";

  const clean = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  return maxLength ? clean.slice(0, maxLength) : clean;
}
