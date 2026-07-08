import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PullRequestHeader } from "@/features/pull-requests/components/pull-request-header";
import { AIReviewMarkdown } from "@/features/pull-requests/components/ai-review-markdown";
import { getPullRequest } from "@/features/pull-requests/server/get-pull-request";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PullRequestDetailPage({ params }: Props) {
  const { id } = await params;

  const pr = await getPullRequest(id);

  if (!pr) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      <PullRequestHeader
        title={pr.title}
        repo={pr.repoFullName}
        author={pr.authorLogin}
        number={pr.prNumber}
        status={pr.status}
      />

      <Card>
        <CardHeader>
          <CardTitle>AI Review</CardTitle>
        </CardHeader>

        <CardContent>
          {pr.reviewComment ? (
            <AIReviewMarkdown content={pr.reviewComment} />
          ) : (
            <p className="text-muted-foreground">
              No AI review has been generated yet.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pull Request Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Repository:</span> {pr.repoFullName}
          </div>

          <div>
            <span className="font-medium">Author:</span>{" "}
            {pr.authorLogin ?? "Unknown"}
          </div>

          <div>
            <span className="font-medium">Base Branch:</span> {pr.baseBranch}
          </div>

          <div>
            <span className="font-medium">Head SHA:</span>{" "}
            <code className="rounded bg-muted px-2 py-1">{pr.headSha}</code>
          </div>

          <div>
            <span className="font-medium">Created:</span>{" "}
            {pr.createdAt.toLocaleString()}
          </div>

          <div>
            <span className="font-medium">Reviewed:</span>{" "}
            {pr.reviewedAt
              ? pr.reviewedAt.toLocaleString()
              : "Not reviewed yet"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
