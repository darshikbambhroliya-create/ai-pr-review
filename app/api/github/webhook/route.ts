import { handleGithubWebhook } from "@/features/github/server/github-webhook";

export async function POST(req: Request) {
  return handleGithubWebhook(req);
}
