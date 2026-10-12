"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Score = {
  id: number;
  played_on: string;
  course: string;
  stableford_points: number;
};

type DashboardProps = {
  userId: string;
  userEmail: string;
  displayName: string;
  initialCharityId: string;
  initialScores: Score[];
  charities: { id: string; name: string }[];
  databaseReady: boolean;
};

const inputClassName =
  "w-full rounded-xl border border-[#d4ddd2] bg-white px-4 py-3 text-[#10231d] outline-none focus:border-[#78966e]";

export default function Dashboard({
  userId,
  userEmail,
  displayName,
  initialCharityId,
  initialScores,
  charities,
  databaseReady,
}: DashboardProps) {
  const supabase = createClient();
  const router = useRouter();
  const [scores, setScores] = useState(initialScores);
  const [charityId, setCharityId] = useState(initialCharityId);
  const [playedOn, setPlayedOn] = useState(new Date().toISOString().slice(0, 10));
  const [course, setCourse] = useState("");
  const [points, setPoints] = useState("");
  const [savingScore, setSavingScore] = useState(false);
  const [savingCharity, setSavingCharity] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function showMessage(text: string, error = false) {
    setMessage(text);
    setIsError(error);
  }

  async function handleAddScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!databaseReady) return;

    setSavingScore(true);
    showMessage("");
    try {
      const { data, error } = await supabase
        .from("golf_scores")
        .insert({
          played_on: playedOn,
          course: course.trim(),
          stableford_points: Number(points),
          user_id: userId,
        })
        .select("id, played_on, course, stableford_points")
        .single();

      if (error) {
        showMessage("Could not save that score. Check the details and try again.", true);
      } else {
        setScores((current) =>
          [data, ...current]
            .sort((a, b) => b.played_on.localeCompare(a.played_on) || b.id - a.id)
            .slice(0, 5)
        );
        setCourse("");
        setPoints("");
        showMessage("Golf score saved.");
      }
    } catch {
      showMessage("Unable to reach the score service. Check your connection and try again.", true);
    } finally {
      setSavingScore(false);
    }
  }

  async function handleSaveCharity() {
    if (!databaseReady || !charityId) return;

    setSavingCharity(true);
    showMessage("");
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ selected_charity_id: charityId })
        .eq("id", userId);

      if (error) {
        showMessage("Could not save your charity choice. Please try again.", true);
      } else {
        showMessage("Charity choice saved.");
      }
    } catch {
      showMessage("Unable to reach the profile service. Check your connection and try again.", true);
    } finally {
      setSavingCharity(false);
    }
  }

  async function handleDeleteScore(id: number) {
    try {
      const { error } = await supabase.from("golf_scores").delete().eq("id", id);
      if (error) {
        showMessage("Could not remove that score. Please try again.", true);
      } else {
        setScores((current) => current.filter((score) => score.id !== id));
        showMessage("Score removed.");
      }
    } catch {
      showMessage("Unable to reach the score service. Check your connection and try again.", true);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setSigningOut(false);
        showMessage("Could not log out. Please try again.", true);
        return;
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setSigningOut(false);
      showMessage("Unable to log out right now. Please try again.", true);
    }
  }

  const selectedCharity = charities.find((charity) => charity.id === charityId);

  return (
    <main className="min-h-screen bg-[#f5f4ed] text-[#10231d]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          digital<span className="text-[#7c9b72]">.</span>HEROES
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="rounded-full border border-[#aebbb0] px-5 py-3 text-sm font-semibold transition hover:bg-white disabled:opacity-50"
        >
          {signingOut ? "Logging out..." : "Log out"}
        </button>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <header className="py-8 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
            Member area
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Welcome{displayName ? `, ${displayName}` : " back"}.
          </h1>
          <p className="mt-3 text-[#647269]">{userEmail}</p>
        </header>

        {!databaseReady && (
          <div role="alert" className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            The Supabase database is missing dashboard fields and the golf
            scores table. In the Supabase SQL Editor, run the full migration
            <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5">202610060001_member_data.sql</code>
            from this project, then reload this page.
          </div>
        )}

        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={`mb-6 rounded-xl p-4 text-sm ${
              isError ? "bg-red-50 text-red-700" : "bg-white text-[#34533d]"
            }`}
          >
            {message}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#78966e]">
                  Score tracking
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Your latest rounds</h2>
              </div>
              <p className="text-sm text-[#68766f]">Latest 5 Stableford scores</p>
            </div>

            <form onSubmit={handleAddScore} className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Date played
                <input
                  className={`${inputClassName} mt-2`}
                  type="date"
                  value={playedOn}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => setPlayedOn(event.target.value)}
                  required
                  disabled={!databaseReady}
                />
              </label>
              <label className="text-sm font-medium">
                Stableford points
                <input
                  className={`${inputClassName} mt-2`}
                  type="number"
                  min="1"
                  max="45"
                  value={points}
                  onChange={(event) => setPoints(event.target.value)}
                  placeholder="For example, 34"
                  required
                  disabled={!databaseReady}
                />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                Golf course
                <input
                  className={`${inputClassName} mt-2`}
                  type="text"
                  maxLength={100}
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  placeholder="Course name"
                  required
                  disabled={!databaseReady}
                />
              </label>
              <button
                type="submit"
                disabled={savingScore || !databaseReady}
                className="rounded-full bg-[#10231d] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:col-span-2"
              >
                {savingScore ? "Saving score..." : "Add score"}
              </button>
            </form>

            {scores.length === 0 ? (
              <p className="mt-8 rounded-2xl bg-[#f7f7f2] p-5 text-sm leading-6 text-[#68766f]">
                Your saved rounds will appear here. Add your first Stableford score above.
              </p>
            ) : (
              <ul className="mt-8 divide-y divide-[#e7ebe4]">
                {scores.map((score) => (
                  <li key={score.id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-semibold">{score.course}</p>
                      <p className="mt-1 text-sm text-[#68766f]">
                        {new Date(`${score.played_on}T00:00:00`).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-xl bg-[#e1e8dc] px-3 py-2 text-sm font-bold">
                        {score.stableford_points} pts
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteScore(score.id)}
                        className="text-sm text-[#68766f] underline hover:text-red-700"
                        aria-label={`Remove score from ${score.course}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#e1e8dc] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#78966e]">
                Your cause
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Choose a charity</h2>
              <p className="mt-3 leading-7 text-[#647269]">
                At least 10% of your subscription contribution is intended for the cause you choose.
              </p>
              <label className="mt-6 block text-sm font-medium">
                Selected cause
                <select
                  className={`${inputClassName} mt-2`}
                  value={charityId}
                  onChange={(event) => setCharityId(event.target.value)}
                  disabled={!databaseReady}
                >
                  <option value="">Choose a cause</option>
                  {charities.map((charity) => (
                    <option key={charity.id} value={charity.id}>
                      {charity.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={handleSaveCharity}
                disabled={savingCharity || !charityId || !databaseReady}
                className="mt-4 w-full rounded-full bg-[#10231d] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {savingCharity ? "Saving choice..." : "Save charity choice"}
              </button>
              {selectedCharity && (
                <p className="mt-4 text-sm text-[#53635d]">
                  Selected: <span className="font-semibold">{selectedCharity.name}</span>
                </p>
              )}
            </section>

            <section className="rounded-3xl bg-[#10231d] p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b7c9ad]">
                Membership
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Membership checkout is not connected</h2>
              <p className="mt-3 leading-7 text-[#c2cec6]">
                Plans are listed for information. Payment and prize draw entry are not active yet.
              </p>
              <Link
                href="/pricing"
                className="mt-5 inline-block font-semibold underline underline-offset-4"
              >
                Review membership plans
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
