import { ReviewStatusBadge } from "./review-status-badge";

type Props = {
  title: string;
  repo: string;
  author: string | null;
  number: number;
  status: string;
};

export function PullRequestHeader({
  title,
  repo,
  author,
  number,
  status,
}: Props) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            #{number} {title}
          </h1>

          <p className="text-muted-foreground">{repo}</p>

          <p className="text-sm text-muted-foreground">@{author}</p>
        </div>

        <ReviewStatusBadge status={status} />
      </div>
    </div>
  );
}
