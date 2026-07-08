import { inngest } from "@/features/inngest/client";
import prisma from "@/lib/db";
import { step } from "inngest";
import { getPullRequestFiles } from "./pr-files";
import { chunkPrFiles } from "./chuk-files";
import { stat } from "fs";
import { title } from "process";
import { generateReview } from "./generateReview";
import { postPrComment } from "./post-pr-comment";

export const reviewPullRequest = inngest.createFunction(
  {
    id: "review-pull-request",
    triggers: { event: "github/pull.recieved" },
  },
  async ({ event, step }) => {
    const pullRequestId = event.data.pullRequestId;

    const pullRequest = await step.run("mark-processing", async () => {
      return prisma.pullRequest.update({
        where: {
          id: pullRequestId,
        },
        data: {
          status: "processing",
        },
      });
    });
    const chunks = await step.run("breakdowncode", async () => {
      const files = await getPullRequestFiles(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber
      );
      return chunkPrFiles(pullRequest.prNumber, files);
    });
    if (chunks.length === 0) {
      await step.run("mark-reviewed-no-code", async () => {
        await prisma.pullRequest.update({
          where: {
            id: pullRequestId,
          },
          data: {
            status: "reviewed",
          },
        });
      });
      return { pullRequestId, status: "reviewed", reason: "no code review" };
    }
    await step.sleep("vector-to-index ", "10s");
    const review = await step.run("generate-ai-review", async () => {
      return generateReview({
        repoFullName: pullRequest.repoFullName,
        title: pullRequest.title,
      });
    });
    await step.run("mark-reviewed", async () => {
      await postPrComment(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
        review
      );
    });

    await step.run("mark-reviewed", async () => {
      await prisma.pullRequest.update({
        where: {
          id: pullRequestId,
        },
        data: {
          status: "reviewed",
          reviewComment: review,
          reviewedAt: new Date(),
        },
      });
    });
    return { pullRequestId, status: "reviewed", reviewComment: review };
  }
);
