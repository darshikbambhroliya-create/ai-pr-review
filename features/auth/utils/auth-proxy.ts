import { auth } from "@/lib/auth";
import getSafeCallbackPath from ".";
import { SIGN_IN_PAGE } from ".";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/dist/server/api-utils";
import path from "path";

function redirectToSignIn(request: NextRequest, path: string) {
  // Create full sign-in URL using base origin + "/sign-in"
  const signInUrl = new URL(SIGN_IN_PAGE, request.url);
  // Example:
  // SIGN_IN_PAGE = "/sign-in"
  // request.url = "http://localhost:3000/dashboard/settings"
  // Result: "http://localhost:3000/sign-in"

  // Combine pathname + query string of original request
  const callbackURL = `${path}${request.nextUrl.search}`;
  // Example:
  // path = "/dashboard/settings"
  // request.nextUrl.search = "?tab=security"
  // Result: "/dashboard/settings?tab=security"

  // Store original page inside URL so we can redirect user back after login
  signInUrl.searchParams.set("callbackURL", callbackURL);
  // Result:
  // http://localhost:3000/sign-in?callbackURL=/dashboard/settings?tab=security

  // Redirect user to sign-in page
  return NextResponse.redirect(signInUrl);
}
function getPostAuthRedirectPath(request: NextRequest) {
  const callbackURL = request.nextUrl.searchParams.get("callbackURL");
  return getSafeCallbackPath(callbackURL);
}

export default async function handleAuthProxy(request: NextRequest) {
  const { pathname } = request.nextUrl; ///dashboard/settings
  if (pathname === "/") {
    return NextResponse.next();
  }
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (pathname === SIGN_IN_PAGE) {
    if (session) {
      const redirectTo = getPostAuthRedirectPath(request);
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.next();
  }
  if (!session) {
    return redirectToSignIn(request, pathname);
  }
  return NextResponse.next();
}
