import db from "@/lib/db";

export async function getPullRequests() {
  return await db.pullRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      repoFullName: true,
      prNumber: true,
      authorLogin: true,
      status: true,
      reviewedAt: true,
      createdAt: true,
    },
  });
}
