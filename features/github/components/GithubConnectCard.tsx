import type { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import { getGithubInstallUrl } from "../utils/github-app";
import { Button } from "@/components/ui/button";
import { LuUnplug } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { disconnectGithubApp } from "../action/index";
import { DisconnectButton } from "./disconnect-app";
type GithubConnectAppProps = {
  userId: string;
  installation: GithubInstallationStatus;
};

function ConnectionDetails({
  connected,
  accountLogin,
}: {
  connected: boolean;
  accountLogin: string | null;
}) {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold">GitHub</h3>

      {connected ? (
        <p className="text-sm text-muted-foreground">
          Connected as <span className="font-medium">{accountLogin}</span>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          GitHub App is not connected.
        </p>
      )}
    </div>
  );
}
function ConnectionAction({
  connected,
  installUrl,
}: {
  connected: boolean;
  installUrl: string;
}) {
  if (connected) {
    return <DisconnectButton />;
  }

  return (
    <Button asChild>
      <a href={installUrl}>
        <FaGithub className="mr-2 h-4 w-4" />
        Install App
      </a>
    </Button>
  );
}

export function GithubConnectCard({
  userId,
  installation,
}: GithubConnectAppProps) {
  const { connected, accountLogin } = installation;
  const installUrl = getGithubInstallUrl(userId);
  return (
    <Card className="w-full max-w-md p-6">
      <div className="flex items-center justify-between">
        <ConnectionDetails connected={connected} accountLogin={accountLogin} />
        <ConnectionAction connected={connected} installUrl={installUrl} />
      </div>
    </Card>
  );
}
