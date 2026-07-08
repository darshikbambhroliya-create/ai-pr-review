import { PullRequestWebhookPayload } from "@/features/github/server/github-webhook";
import prisma from "@/lib/db";

function getAuthorLogin(user: { login: string } | null): string | null {
  if (!user) {
    return null;
  }
  return user.login;
}

export async function savePullRequest(event: PullRequestWebhookPayload) {
  return prisma.pullRequest.upsert({
    where: {
      repoFullName_prNumber: {
        repoFullName: event.repository.full_name,
        prNumber: event.pull_request.number,
      },
    },

    create: {
      installationId: event.installation.id,
      repoFullName: event.repository.full_name,
      prNumber: event.pull_request.number,
      title: event.pull_request.title,
      authorLogin: event.pull_request.user?.login,
      headSha: event.pull_request.head.sha,
      baseBranch: event.pull_request.base.ref,
      status: "pending",
    },

    update: {
      title: event.pull_request.title,
      headSha: event.pull_request.head.sha,
      status: "pending",
    },
  });
}
