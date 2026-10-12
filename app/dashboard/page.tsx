import { redirect } from "next/navigation";
import Dashboard from "@/app/dashboard/dashboard";
import { charities } from "@/lib/charities";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (authError || !claims?.sub) {
    redirect("/login");
  }

  const userId = claims.sub;
  const [{ data: profile, error: profileError }, { data: scores, error: scoresError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("display_name, selected_charity_id")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("golf_scores")
        .select("id, played_on, course, stableford_points")
        .eq("user_id", userId)
        .order("played_on", { ascending: false })
        .order("id", { ascending: false })
        .limit(5),
    ]);

  const databaseReady = !profileError && !scoresError;

  return (
    <Dashboard
      userId={userId}
      userEmail={typeof claims.email === "string" ? claims.email : "Member"}
      displayName={profile?.display_name ?? ""}
      initialCharityId={profile?.selected_charity_id ?? ""}
      initialScores={scores ?? []}
      charities={charities.map(({ id, name }) => ({ id, name }))}
      databaseReady={databaseReady}
    />
  );
}
