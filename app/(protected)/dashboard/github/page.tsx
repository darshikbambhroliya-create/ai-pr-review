import { requireAuth } from "@/features/auth/action/SignWithGoogle";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { GithubConnectCard } from "@/hooks/github/components/GithubConnectCard";
import { getInstallationStatus } from "@/hooks/github/server/installation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Github",
  description: "Github integration Page",
};

const GithubPage = async () => {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);
  return (
    <>
      <DashboardHeader title="github app" description="app" />
      <div>GithubPage</div>
      <GithubConnectCard userId={session.user.id} installation={installation} />
    </>
  );
};

export default GithubPage;
