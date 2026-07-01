import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignForm from "@/features/auth/components/GoogleSignForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type SearchParams = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function SignPage({ searchParams }: SearchParams) {
  const { callbackUrl } = await searchParams;

  return <GoogleSignForm callbackUrl={callbackUrl} />;
}
