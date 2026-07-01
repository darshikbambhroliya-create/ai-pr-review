import { Button } from "@/components/ui/button";
import SignWithGoogle from "../action/SignWithGoogle";

type GitHubSignFormProps = {
  callbackUrl?: string;
};

export default function GoogleSignForm({ callbackUrl }: GitHubSignFormProps) {
  return (
    <form action={SignWithGoogle}>
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}

      <Button type="submit" className="w-full">
        Continue with Google
      </Button>
    </form>
  );
}
