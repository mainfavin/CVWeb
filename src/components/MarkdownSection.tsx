import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  path: string;
}

export function MarkdownSection({ path }: MarkdownProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(path)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent("⚠️ Error cargando documentación."));
  }, [path]);

  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
