"use server";

import { getServerSession } from "@/features/auth/action/SignWithGoogle";
import { DeleteInstallation } from "@/features/github/server/installation";

export async function disconnectGithubApp() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await DeleteInstallation(session.user.id);
}
