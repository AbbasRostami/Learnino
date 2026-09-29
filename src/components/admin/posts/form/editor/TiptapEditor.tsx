"use client";

import { cn } from "@/lib/utils";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { NodeSelection } from "@tiptap/pm/state";
import { CellSelection } from "@tiptap/pm/tables";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { useLocale, useTranslations } from "next-intl";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCheckSquare,
  FaCode,
  FaItalic,
  FaListOl,
  FaListUl,
  FaMinus,
  FaQuoteRight,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import {
  FcAddColumn,
  FcAddRow,
  FcDeleteColumn,
  FcDeleteRow,
} from "react-icons/fc";
import { GrTable } from "react-icons/gr";
import { HiOutlineLink } from "react-icons/hi";
import { HiLinkSlash } from "react-icons/hi2";
import { LuImagePlus, LuMaximize, LuPalette, LuTable } from "react-icons/lu";
import { MdSubscript, MdSuperscript } from "react-icons/md";
import { RiArrowDownSLine, RiFontColor } from "react-icons/ri";
import {
  TbClearFormatting,
  TbSourceCode,
  TbTextDirectionLtr,
  TbTextDirectionRtl,
} from "react-icons/tb";
import ImageResize from "tiptap-extension-resize-image";

const lowlight = createLowlight(common);
const headingLevels = [1, 2, 3, 4, 5, 6] as const;

type Align = "left" | "center" | "right";

const CustomImage = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      textAlign: {
        default: "center",
        renderHTML: (attributes) => {
          const align = (attributes.textAlign ?? "center") as Align;
          const styles = {
            left: "margin-left: 0; margin-right: auto;",
            center: "margin-left: auto; margin-right: auto;",
            right: "margin-left: auto; margin-right: 0;",
          };
          return {
            style: `display: block; ${styles[align] || styles.center}`,
          };
        },
      },
    };
  },
});

const DocumentDirection = Extension.create({
  name: "documentDirection",
  addGlobalAttributes() {
    return [
      {
        types: ["heading", "paragraph"],
        attributes: {
          direction: {
            default: null,
            parseHTML: (element) => element.getAttribute("dir"),
            renderHTML: (attributes) => {
              if (!attributes.direction) return {};
              return { dir: attributes.direction };
            },
          },
        },
      },
    ];
  },
});

interface TableSelectorProps {
  onSelect: (rows: number, cols: number) => void;
  tableRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}

const TableSelector = ({ onSelect, tableRef, label }: TableSelectorProps) => {
  const [hovered, setHovered] = useState({ r: 0, c: 0 });
  const grid = Array.from({ length: 10 }, (_, r) =>
    Array.from({ length: 10 }, (_, c) => ({ r: r + 1, c: c + 1 })),
  );

  return (
    <div
      ref={tableRef}
      className="p-2 bg-card border border-border rounded-2xl shadow-xl w-64"
    >
      <div className="grid grid-cols-10 gap-1">
        {grid.flat().map((cell) => (
          <div
            key={`${cell.r}-${cell.c}`}
            onMouseEnter={() => setHovered({ r: cell.r, c: cell.c })}
            onClick={() => onSelect(cell.r, cell.c)}
            className={cn(
              "w-5 h-5 border transition-colors cursor-pointer rounded-sm",
              cell.r <= hovered.r && cell.c <= hovered.c
                ? "bg-primary border-primary"
                : "bg-muted border-border",
            )}
          />
        ))}
      </div>
      <div className="mt-2 text-center text-[10px] font-bold text-muted-foreground">
        {hovered.r > 0 ? `${hovered.r} × ${hovered.c}` : label}
      </div>
    </div>
  );
};

type BtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
};

const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  ({ children, onClick, active, disabled, title }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
          "px-2.5 py-2 rounded-lg text-xs font-medium border flex items-center gap-1 transition select-none cursor-pointer",
          active
            ? "bg-primary text-primary-foreground border-primary shadow-xs"
            : "bg-background text-foreground border-border/60",
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-muted active:scale-95",
        )}
      >
        {children}
      </button>
    );
  },
);
Btn.displayName = "Btn";

function Sep() {
  return <span className="w-px h-6 bg-border mx-0.5 self-center" />;
}

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  uploadFn?: (file: File) => Promise<string | null>;
  placeholder?: string;
  className?: string;
  dir?: "rtl" | "ltr";
}

export function TiptapEditor({
  value = "",
  onChange,
  uploadFn,
  placeholder,
  className = "",
  dir = "rtl",
}: TiptapEditorProps) {
  const t = useTranslations("admin.posts.editor");
  const locale = useLocale();

  // 🎯 جلوگیری از SSR اجرای استفاده از TipTap در سرور
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isAlignList, setIsAlignList] = useState(false);
  const [showTableGrid, setShowTableGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [isHeadingList, setIsHeadingList] = useState(false);
  const [, setForceRender] = useState(0);

  const headingDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false,
        link: false,
      }),
      Underline,
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      DocumentDirection,
      CustomImage,
      Table.configure(),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlockLowlight.configure({ lowlight }),
      CharacterCount,
    ],
    content: value,
    onTransaction: () => {
      setForceRender((prev) => prev + 1);
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        dir,
        class:
          "tiptap-editor min-h-[280px] outline-none px-6 py-4 leading-8 prose dark:prose-invert max-w-none",
        "data-placeholder": placeholder || t("placeholder"),
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        headingDropdownRef.current &&
        !headingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsHeadingList(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAlignList(false);
      }
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setShowTableGrid(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => window.removeEventListener("mousedown", handleOutSideClick);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-80 rounded-2xl border border-border bg-muted/20 animate-pulse flex items-center justify-center text-xs text-muted-foreground font-bold">
        {t("placeholder")}
      </div>
    );
  }

  const sel = editor?.state.selection;

  const isTableSelected =
    !!editor &&
    (editor.isActive("table") ||
      sel instanceof NodeSelection ||
      sel instanceof CellSelection);

  const getCurrentHeadingLabel = () => {
    for (const level of headingLevels) {
      if (editor?.isActive("heading", { level }))
        return `${t("heading")} ${level}`;
    }
    return t("paragraph");
  };

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    setShowTableGrid(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !uploadFn || !editor) return;
    try {
      const uploadedUrl = await uploadFn(file);
      if (uploadedUrl) {
        editor.chain().focus().setImage({ src: uploadedUrl }).run();
      }
    } catch (err) {
      console.error(err);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const charCount = editor?.storage?.characterCount?.characters?.() ?? 0;
  const formattedCount = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(charCount);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-background flex flex-col transition-all",
        isFullscreen
          ? "fixed inset-0 z-9999 h-screen w-screen rounded-none"
          : "relative",
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-2 border-b border-border bg-muted/40 rounded-t-2xl select-none">
        <div className="relative" ref={headingDropdownRef}>
          <Btn
            onClick={() => setIsHeadingList(!isHeadingList)}
            active={editor.isActive("heading") || editor.isActive("paragraph")}
          >
            <span className="text-xs min-w-16 text-center font-medium">
              {getCurrentHeadingLabel()}
            </span>
            <RiArrowDownSLine size={12} />
          </Btn>

          {isHeadingList && (
            <div className="absolute top-10 left-0 z-50 bg-card border border-border rounded-xl p-1 shadow-xl flex flex-col min-w-40 gap-0.5">
              <button
                type="button"
                className={cn(
                  "p-2 text-start text-xs rounded-lg hover:bg-muted transition-colors font-bold",
                  editor.isActive("paragraph")
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground",
                )}
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setIsHeadingList(false);
                }}
              >
                {t("paragraph")}
              </button>
              {headingLevels.map((level) => {
                const sizes: Record<number, string> = {
                  1: "text-xl font-black",
                  2: "text-lg font-black",
                  3: "text-base font-bold",
                  4: "text-sm font-semibold",
                  5: "text-xs font-semibold",
                  6: "text-[11px] font-medium",
                };
                return (
                  <button
                    key={level}
                    type="button"
                    className={cn(
                      "p-2 text-start rounded-lg hover:bg-muted transition-colors flex justify-between items-center",
                      sizes[level],
                      editor.isActive("heading", { level })
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground",
                    )}
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level }).run();
                      setIsHeadingList(false);
                    }}
                  >
                    <span>
                      {t("heading")} {level}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground/60 bg-muted px-1 py-0.5 rounded border border-border">
                      H{level}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <Btn
          onClick={() => {
            editor
              .chain()
              .focus()
              .updateAttributes("paragraph", { direction: "rtl" })
              .run();
            editor.chain().focus().setTextAlign("right").run();
          }}
          title={t("dirRtl")}
        >
          <TbTextDirectionRtl size={18} />
        </Btn>
        <Btn
          onClick={() => {
            editor
              .chain()
              .focus()
              .updateAttributes("paragraph", { direction: "ltr" })
              .run();
            editor.chain().focus().setTextAlign("left").run();
          }}
          title={t("dirLtr")}
        >
          <TbTextDirectionLtr size={18} />
        </Btn>
        <Sep />

        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title={t("bold")}
        >
          <FaBold size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title={t("italic")}
        >
          <FaItalic size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title={t("underline")}
        >
          <FaUnderline size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title={t("strike")}
        >
          <FaStrikethrough size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          active={editor.isActive("subscript")}
          title={t("subscript")}
        >
          <MdSubscript size={18} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          active={editor.isActive("superscript")}
          title={t("superscript")}
        >
          <MdSuperscript size={18} />
        </Btn>
        <Sep />

        <div className="flex items-center gap-1 bg-background border border-border rounded-lg px-1.5">
          <RiFontColor
            size={16}
            className="text-muted-foreground"
            title={t("textColor")}
          />
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setColor((e.target as HTMLInputElement).value)
                .run()
            }
            className="w-5 h-5 cursor-pointer p-0 border-0 bg-transparent"
            title={t("textColor")}
          />
          <LuPalette
            size={16}
            className="text-muted-foreground ms-1"
            title={t("highlight")}
          />
          <input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .setHighlight({ color: (e.target as HTMLInputElement).value })
                .run()
            }
            className="w-5 h-5 cursor-pointer p-0 border-0 bg-transparent"
            title={t("highlight")}
          />
        </div>
        <Sep />

        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title={t("blockquote")}
        >
          <FaQuoteRight size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title={t("codeBlock")}
        >
          <FaCode size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title={t("hr")}
        >
          <FaMinus size={14} />
        </Btn>

        <Btn
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title={t("clearFormat")}
        >
          <TbClearFormatting size={16} />
        </Btn>
        <Sep />

        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title={t("bulletList")}
        >
          <FaListUl size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title={t("orderedList")}
        >
          <FaListOl size={14} />
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          active={editor.isActive("taskList")}
          title={t("taskList")}
        >
          <FaCheckSquare size={14} />
        </Btn>
        <Sep />

        <div className="relative" ref={dropdownRef}>
          <Btn onClick={() => setIsAlignList(!isAlignList)} title={t("align")}>
            <FaAlignJustify size={14} />
            <RiArrowDownSLine size={12} />
          </Btn>
          {isAlignList && (
            <div className="absolute top-10 left-0 z-50 bg-card border border-border rounded-xl p-1 shadow-md flex flex-col gap-0.5">
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg cursor-pointer flex items-center gap-2 text-xs"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <FaAlignRight size={12} />
                <span>{t("alignRight")}</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg cursor-pointer flex items-center gap-2 text-xs"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <FaAlignCenter size={12} />
                <span>{t("alignCenter")}</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg cursor-pointer flex items-center gap-2 text-xs"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <FaAlignLeft size={12} />
                <span>{t("alignLeft")}</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg cursor-pointer flex items-center gap-2 text-xs"
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <FaAlignJustify size={12} />
                <span>{t("alignJustify")}</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <Btn
            onClick={() => setShowTableGrid(!showTableGrid)}
            title={t("table")}
          >
            <GrTable size={14} /> <RiArrowDownSLine size={12} />
          </Btn>
          {showTableGrid && (
            <div className="absolute top-10 left-0 z-50">
              <TableSelector
                tableRef={tableRef}
                onSelect={insertTable}
                label={t("tableSelect")}
              />
            </div>
          )}
        </div>

        {isTableSelected && (
          <div className="flex gap-1 bg-amber-500/10 p-0.5 rounded-lg border border-amber-500/30">
            <button
              type="button"
              className="p-1 hover:bg-amber-500/20 rounded cursor-pointer"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title={t("addColumn")}
            >
              <FcAddColumn size={18} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-amber-500/20 rounded cursor-pointer"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title={t("deleteColumn")}
            >
              <FcDeleteColumn size={18} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-amber-500/20 rounded cursor-pointer"
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title={t("addRow")}
            >
              <FcAddRow size={18} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-amber-500/20 rounded cursor-pointer"
              onClick={() => editor.chain().focus().deleteRow().run()}
              title={t("deleteRow")}
            >
              <FcDeleteRow size={18} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-rose-500/20 rounded text-rose-600 cursor-pointer"
              onClick={() => editor.chain().focus().deleteTable().run()}
              title={t("deleteTable")}
            >
              <LuTable size={18} />
            </button>
          </div>
        )}

        <Btn
          onClick={() => {
            const url = prompt(t("linkPrompt"));
            if (!url) return;
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
          active={editor.isActive("link")}
          title={t("link")}
        >
          <HiOutlineLink size={16} />
        </Btn>
        <Btn
          onClick={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
          disabled={!editor.getAttributes("link")?.href}
          title={t("unlink")}
        >
          <HiLinkSlash size={16} />
        </Btn>
        <Btn onClick={() => fileInputRef.current?.click()} title={t("image")}>
          <LuImagePlus size={16} />
        </Btn>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          hidden
        />

        <Sep />
        <Btn
          onClick={() => setShowSource(!showSource)}
          active={showSource}
          title={t("sourceCode")}
        >
          <TbSourceCode size={15} />
        </Btn>
        <Btn
          onClick={() => setIsFullscreen(!isFullscreen)}
          active={isFullscreen}
          title={t("fullscreen")}
        >
          <LuMaximize size={15} />
        </Btn>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto bg-background relative flex">
        {showSource ? (
          <textarea
            className="w-full flex-1 p-4 font-mono text-xs border-0 outline-none resize-none bg-neutral-900 text-emerald-400"
            value={editor.getHTML()}
            onChange={(e) =>
              editor.commands.setContent(e.target.value, { emitUpdate: true })
            }
          />
        ) : (
          <div className="w-full flex-1 min-w-0">
            <EditorContent editor={editor} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-muted/40 rounded-b-2xl text-[10px] text-muted-foreground select-none">
        <span>
          {t("characters")}: <b className="font-mono">{formattedCount}</b>
        </span>
      </div>

      <style jsx global>{`
        .tiptap-editor {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .tiptap-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: inline-start;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          height: 0;
        }
        .tiptap-editor ul {
          list-style-type: disc;
          padding-inline-start: 2rem;
          margin: 0.5rem 0;
        }
        .tiptap-editor ol {
          list-style-type: decimal;
          padding-inline-start: 2rem;
          margin: 0.5rem 0;
        }
        .tiptap-editor li {
          display: list-item;
        }
        .tiptap-editor blockquote {
          border-inline-start: 4px solid hsl(var(--border));
          padding-inline-start: 1rem;
          color: hsl(var(--muted-foreground));
          font-style: italic;
          margin: 1rem 0;
        }
        .tiptap-editor pre {
          background-color: #1e293b;
          color: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          font-family: monospace;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .tiptap-editor ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }
        .tiptap-editor ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .tiptap-editor img.ProseMirror-selectednode {
          outline: 2px solid hsl(var(--primary));
        }
        .tiptap-editor table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }
        .tiptap-editor td,
        .tiptap-editor th {
          min-width: 1em;
          border: 1px solid hsl(var(--border));
          padding: 6px 8px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .tiptap-editor hr {
          border: 0;
          border-top: 1px solid hsl(var(--border));
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
