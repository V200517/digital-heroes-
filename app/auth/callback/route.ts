import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const requestedNext = requestUrl.searchParams.get("next");
  const nextPath =
    requestedNext === "/reset-password"
      ? "/reset-password"
      : requestedNext === "/dashboard"
        ? "/dashboard"
        : "/";
  const errorRedirect = (reason: string) =>
    NextResponse.redirect(
      new URL(`/auth/confirmation-error?reason=${reason}`, requestUrl.origin)
    );

  if (!code && !tokenHash) {
    return errorRedirect("missing-parameters");
  }

  if (
    tokenHash &&
    type !== "signup" &&
    type !== "email" &&
    type !== "recovery"
  ) {
    return errorRedirect("unsupported-link");
  }

  const cookieStore = await cookies();
  const response = NextResponse.redirect(
    new URL(nextPath, requestUrl.origin)
  );
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  let error;
  try {
    ({ error } = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({
          token_hash: tokenHash!,
          type:
            type === "signup"
              ? "signup"
              : type === "recovery"
                ? "recovery"
                : "email",
        }));
  } catch (cause) {
    console.error(
      "Supabase email confirmation request failed:",
      cause instanceof Error ? cause.message : "Unknown error"
    );
    return errorRedirect("service-unavailable");
  }

  if (error) {
    console.error("Supabase email confirmation failed:", error.message);
    return errorRedirect("invalid-or-expired-link");
  }

  return response;
}
