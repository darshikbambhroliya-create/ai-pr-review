export const SIGN_IN_PAGE = "/sign-in";

export const DEFAULT_AUTH_CALLBACK = "/dashboard";

export default function getSafeCallbackPath(
  callbackURL: string | null | undefined
) {
  if (callbackURL?.startsWith("/") && !callbackURL.startsWith("//")) {
    return callbackURL;
  }
  return DEFAULT_AUTH_CALLBACK;
}
