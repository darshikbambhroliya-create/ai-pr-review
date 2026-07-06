"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import getSafeCallbackPath, { DEFAULT_AUTH_CALLBACK } from "../utils";
import { SIGN_IN_PAGE } from "../utils";

export default async function SignWithGoogle(formData: FormData) {
  const callback = await formData.get("callbackUrl");
  const redirectTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null
  );
  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: redirectTo,
    },
    headers: await headers(),
  });
  if (result.url) {
    redirect(result.url);
  }
}

export async function SignWithGithub(formData: FormData) {
  const callback = await formData.get("callbackUrl");
  const redirectTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null
  );
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo,
    },
    headers: await headers(),
  });
  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect(SIGN_IN_PAGE);
  }
  return session;
}

export async function requireUnAuth() {
  const session = await getServerSession();
  if (session) {
    redirect(DEFAULT_AUTH_CALLBACK);
  }
}
