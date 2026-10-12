"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function ResendConfirmation() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const { error } = await createClient().auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) {
        setMessage(error.message);
        setIsError(true);
      } else {
        setMessage("If this address needs confirmation, a new email is on its way. Check your inbox and spam folder.");
      }
    } catch {
      setMessage("Could not request a new email right now. Please try again shortly.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
      <label htmlFor="confirmation-email" className="block text-sm font-medium text-gray-700">
        Email address
      </label>
      <input id="confirmation-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-300 px-4 py-3" />
      <button type="submit" disabled={loading} className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#09251e] disabled:opacity-50">
        {loading ? "Sending..." : "Send a new confirmation email"}
      </button>
      {message && <p role={isError ? "alert" : "status"} className={`text-sm ${isError ? "text-red-700" : "text-gray-600"}`}>{message}</p>}
    </form>
  );
}
