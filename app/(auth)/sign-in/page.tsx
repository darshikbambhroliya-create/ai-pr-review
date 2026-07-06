import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignForm from "@/features/auth/components/GoogleSignForm";
import GithubSignForm from "@/features/auth/components/GithubSignForm";

type SearchParams = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignPage({ searchParams }: SearchParams) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Continue with your preferred provider.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <GoogleSignForm callbackUrl={callbackUrl} />
          <GithubSignForm callbackUrl={callbackUrl} />
        </CardContent>
      </Card>
    </div>
  );
}
