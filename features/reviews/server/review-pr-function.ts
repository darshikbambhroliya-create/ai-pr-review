import { buildRepoNamespace } from "@/features/repo-sync/server/repo-sync";
import { generateReview } from "./generateReview";
import {
  buildPrNamespace,
  saveChunksToPinecone,
  searchPrContext,
} from "./vetor";
import { chunkPrFiles } from "./chuk-files";
import prisma from "@/lib/db";
import { getPullRequestFiles } from "./pr-files";
import { inngest } from "@/features/inngest/client";
import { postPrComment } from "./post-pr-comment";

export const reviewPullRequest = inngest.createFunction(
  {
    id: "review-pull-request",
    triggers: { event: "github/pr.received" },
  },

  async ({ event, step }) => {
    console.log("🚀 Review PR started");

    const pullRequestId = event.data.pullRequestId as string;

    console.log("PR ID:", pullRequestId);

    const pullRequest = await step.run("mark-processing", async () => {
      console.log("⏳ Marking processing...");

      const result = await prisma.pullRequest.update({
        where: {
          id: pullRequestId,
        },
        data: {
          status: "processing",
        },
      });

      console.log("✅ Processing marked");

      return result;
    });

    const chunks = await step.run("breakdown-code", async () => {
      console.log("📂 Fetching PR files...");

      const files = await getPullRequestFiles(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber
      );

      console.log("Files received:", files.length);

      const result = chunkPrFiles(pullRequest.prNumber, files);

      console.log("Chunks created:", result.length);

      return result;
    });

    if (chunks.length === 0) {
      console.log("⚠️ No code changes");

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

      return {
        pullRequestId,
        status: "reviewed",
        reason: "no code changes",
      };
    }

    const prNamespace = buildPrNamespace(
      pullRequest.repoFullName,
      pullRequest.prNumber
    );

    await step.run("save-pr-vectors", async () => {
      console.log("🌲 Saving vectors...");

      await saveChunksToPinecone(prNamespace, chunks);

      console.log("✅ Vectors saved");
    });

    await step.sleep("wait-for-vectors", "10s");

    const repoContextSnippets = await step.run(
      "search-repo-context",
      async () => {
        console.log("🔍 Searching repo context...");

        const repoSync = await prisma.repoSync.findUnique({
          where: {
            repoFullName: pullRequest.repoFullName,
          },
        });

        console.log("Repo sync:", repoSync?.status);

        if (!repoSync || repoSync.status !== "synced") {
          console.log("No repo context");

          return [];
        }

        const repoNamespace = buildRepoNamespace(pullRequest.repoFullName);

        const result = await searchPrContext(repoNamespace, pullRequest.title);

        console.log("Context found:", result.length);

        return result;
      }
    );

    const review = await step.run("generate-ai-review", async () => {
      console.log("🤖 Generating AI review...");

      const contextSnippets = chunks.map((chunk) => chunk.text);

      const result = await generateReview({
        repoFullName: pullRequest.repoFullName,

        title: pullRequest.title,

        contextSnippets,

        repoContextSnippets,
      });

      console.log("✅ AI review generated");

      return result;
    });

    await step.run("post-pr-comment", async () => {
      console.log("💬 Posting Github comment...");

      await postPrComment(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
        review
      );

      console.log("✅ Comment posted");
    });

    await step.run("mark-reviewed", async () => {
      console.log("Updating database...");

      await prisma.pullRequest.update({
        where: {
          id: pullRequestId,
        },

        data: {
          status: "reviewed",

          reviewComment:
            typeof review === "string" ? review : JSON.stringify(review),

          reviewedAt: new Date(),
        },
      });

      console.log("🎉 PR review completed");
    });

    return {
      pullRequestId,
      status: "reviewed",
      review,
    };
  }
);
