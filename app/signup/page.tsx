"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageIsError(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: {
            name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        setMessageIsError(true);
      } else if (data.session) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setMessage(
          "Account created! Please check your email to verify your account."
        );
      }
    } catch (error) {
      console.error("Signup request failed:", error);
      setMessage("Unable to create your account. Please try again.");
      setMessageIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendConfirmation() {
    if (!email) {
      setMessage("Enter your email address first so we know where to send the link.");
      setMessageIsError(true);
      return;
    }

    setResending(true);
    setMessage("");
    setMessageIsError(false);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setMessage(error.message);
        setMessageIsError(true);
      } else {
        setMessage("A new confirmation email was requested. Check your inbox and spam folder.");
      }
    } catch (error) {
      console.error("Resend confirmation request failed:", error);
      setMessage("Unable to request another confirmation email. Please try again later.");
      setMessageIsError(true);
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5ed] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-[#09251e]">
          Create account
        </h1>

        <p className="mt-2 text-gray-600">
          Start your Digital Heroes journey.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Minimum 6 characters"
            />
          </div>

          {message && (
            <div
              role={messageIsError ? "alert" : "status"}
              className={`rounded-xl p-3 text-sm ${
                messageIsError
                  ? "bg-red-50 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleResendConfirmation}
            disabled={resending}
            className="w-full text-sm font-semibold text-[#09251e] underline disabled:opacity-50"
          >
            {resending ? "Requesting a new email..." : "Did not receive it? Resend confirmation email"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#09251e] px-4 py-3 font-semibold text-white"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold underline"
          >
            Log in
          </a>
        </p>

      </div>
    </main>
  );
}
