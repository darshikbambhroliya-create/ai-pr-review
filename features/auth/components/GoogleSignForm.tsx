import { Button } from "@/components/ui/button";
import SignWithGoogle from "../action/SignWithGoogle";
import { FcGoogle } from "react-icons/fc";
type GoogleSignFormProps = {
  callbackUrl?: string;
};

export default function GoogleSignForm({ callbackUrl }: GoogleSignFormProps) {
  return (
    <form action={SignWithGoogle}>
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}

      <Button type="submit" className="w-full">
        <FcGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
    </form>
  );
}
