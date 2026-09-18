interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg prose-blockquote:border-primary/40 prose-blockquote:bg-muted/30 prose-blockquote:rounded-e-2xl prose-blockquote:py-1 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:rounded-2xl prose-pre:shadow-lg"
      dangerouslySetInnerHTML={{ __html: content }}
      itemProp="articleBody"
    />
  );
}
