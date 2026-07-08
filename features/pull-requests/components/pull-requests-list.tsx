import { PullRequestCard } from "./pull-request-card";

type Props = {
  pullRequests: {
    id: string;
    title: string;
    repoFullName: string;
    prNumber: number;
    authorLogin: string | null;
    status: string;
    reviewedAt: Date | null;
    createdAt: Date;
  }[];
};

export function PullRequestsList({ pullRequests }: Props) {
  if (!pullRequests.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h2 className="font-semibold text-lg">No Pull Requests Found</h2>

        <p className="text-muted-foreground mt-2">
          Install the GitHub App and open a pull request.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pullRequests.map((pr) => (
        <PullRequestCard key={pr.id} pr={pr} />
      ))}
    </div>
  );
}
