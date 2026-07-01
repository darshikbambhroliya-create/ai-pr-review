"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        router.push("/sign-in");
      }}>
      Logout
    </Button>
  );
}
