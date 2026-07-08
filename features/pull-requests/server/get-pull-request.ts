import db from "@/lib/db";

export async function getPullRequest(id: string) {
  return await db.pullRequest.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      repoFullName: true,
      prNumber: true,
      authorLogin: true,
      status: true,
      reviewComment: true,
      reviewedAt: true,
      createdAt: true,
      baseBranch: true,
      headSha: true,
    },
  });
}
