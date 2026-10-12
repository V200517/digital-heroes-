import ResendConfirmation from "./resend-confirmation";

type ConfirmationErrorPageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function ConfirmationErrorPage({
  searchParams,
}: ConfirmationErrorPageProps) {
  const { reason } = await searchParams;
  const message =
    reason === "missing-parameters"
      ? "The confirmation link did not return the required details. Check your Supabase email redirect settings and request a new confirmation email."
      : reason === "unsupported-link"
        ? "This email link type is not supported. Open the newest signup confirmation email or request another one."
        : reason === "service-unavailable"
          ? "We could not reach the authentication service to verify this link. Please try again, or request a new confirmation email."
          : "The confirmation link may have expired or already been used. Request a new confirmation email, or try logging in if you already confirmed your account.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ed] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-[#09251e]">
          Email confirmation failed
        </h1>
        <p className="mt-4 text-gray-600">{message}</p>
        <ResendConfirmation />
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/login"
            className="rounded-xl bg-[#09251e] px-5 py-3 font-semibold text-white"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#09251e]"
          >
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
