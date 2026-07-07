"use client";

import { Button } from "@/components/ui/button";
import { LuUnplug } from "react-icons/lu";
import { disconnectGithubApp } from "../action";

export function DisconnectButton() {
  const handleDisconnect = async () => {
    window.open(
      "https://github.com/settings/installations",
      "_blank",
      "noopener,noreferrer"
    );

    await disconnectGithubApp();
  };

  return (
    <Button variant="destructive" onClick={handleDisconnect}>
      <LuUnplug className="mr-2 h-4 w-4" />
      Disconnect
    </Button>
  );
}
