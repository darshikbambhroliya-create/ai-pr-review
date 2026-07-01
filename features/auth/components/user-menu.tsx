"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SIGN_IN_PAGE } from "../utils";
export type UserMenuUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};``
export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) return null;

  const user = session.user;

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() ||
    user.email?.[0].toUpperCase() ||
    "U";

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push(SIGN_IN_PAGE),
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
