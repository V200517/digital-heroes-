"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else {
        setMessage(
          "If an account exists for that email, a password reset link has been sent. Check your inbox and spam folder."
        );
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      setMessage("Unable to request a password reset. Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ed] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#09251e]">Reset password</h1>
        <p className="mt-3 text-gray-600">
          Enter your account email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#09251e]"
            />
          </div>

          {message && (
            <p
              role={isError ? "alert" : "status"}
              className={`rounded-xl p-3 text-sm ${
                isError ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#09251e] px-4 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <a href="/login" className="font-semibold text-[#09251e] underline">
            Back to log in
          </a>
        </p>
      </div>
    </main>
  );
}
