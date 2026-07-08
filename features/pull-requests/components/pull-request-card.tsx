import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewStatusBadge } from "./review-status-badge";

type Props = {
  pr: {
    id: string;
    title: string;
    repoFullName: string;
    prNumber: number;
    authorLogin: string | null;
    status: string;
    reviewedAt: Date | null;
    createdAt: Date;
  };
};

export function PullRequestCard({ pr }: Props) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">
            #{pr.prNumber} {pr.title}
          </h3>

          <p className="text-sm text-muted-foreground">{pr.repoFullName}</p>

          <p className="text-sm text-muted-foreground">@{pr.authorLogin}</p>

          <ReviewStatusBadge status={pr.status} />
        </div>

        <Button asChild>
          <Link href={`/dashboard/pull-requests/${pr.id}`}>View Review</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
