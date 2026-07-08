import { PullRequestsList } from "@/features/pull-requests/components/pull-requests-list";
import { getPullRequests } from "@/features/pull-requests/server/get-pull-requests";

export default async function PullRequestsPage() {
  const pullRequests = await getPullRequests();

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold">Pull Requests</h1>
        <p className="text-muted-foreground">
          Review history and AI-generated feedback.
        </p>
      </div>

      <PullRequestsList pullRequests={pullRequests} />
    </div>
  );
}
