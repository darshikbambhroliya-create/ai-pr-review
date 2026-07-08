import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

export function AIReviewMarkdown({ content }: Props) {
  return (
    <div className="prose dark:prose-invert max-w-none rounded-xl border p-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
