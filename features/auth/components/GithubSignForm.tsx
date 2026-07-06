import { Button } from "@/components/ui/button";
import { SignWithGithub } from "../action/SignWithGoogle";
import { FaGithub } from "react-icons/fa";
type GithubSignProps = {
  callbackUrl?: string;
};

export default function GithubSignForm({ callbackUrl }: GithubSignProps) {
  return (
    <form action={SignWithGithub}>
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}
      <Button type="submit" className="w-full">
        <FaGithub className="size-5" />
        Continue with Github
      </Button>
    </form>
  );
}
