"use server";

import { getServerSession } from "@/features/auth/action/SignWithGoogle";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { redirect } from "next/navigation";
import { DeleteInstallation } from "../server/installation";

export async function disconnectGithubApp() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  await DeleteInstallation(session.user.id);
  redirect(DASHBOARD_ROUTES.github);
}
