import Link from "next/link";
import { charities } from "@/lib/charities";

export default function CharitiesPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ed] text-[#10231d]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          digital<span className="text-[#7c9b72]">.</span>HEROES
        </Link>
        <a
          href="/signup"
          className="rounded-full bg-[#10231d] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Start playing
        </a>
      </nav>

      <section className="px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
              Give back
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              Choose a cause that matters to you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#647269]">
              The planned membership model lets each member choose a cause,
              with at least 10% of the subscription contribution intended for
              that cause.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#68766f]">
              Membership payments and charity transfers are not active yet.
              These cause categories are a product preview, not confirmed charity partners.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {charities.map((charity) => (
              <article
                key={charity.name}
                className="flex flex-col rounded-3xl bg-[#e1e8dc] p-7"
              >
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl"
                >
                {charity.name.slice(0, 1)}
                </div>
                <h2 className="mt-8 text-2xl font-semibold">{charity.name}</h2>
                <p className="mt-3 flex-1 leading-7 text-[#647269]">
                  {charity.description}
                </p>
                <p className="mt-6 text-sm font-semibold">{charity.impact}</p>
              </article>
            ))}
          </div>

          <a
            href="/signup"
            className="mt-10 inline-block rounded-full bg-[#10231d] px-7 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Join Digital Heroes
          </a>
          <Link
            href="/dashboard"
            className="ml-5 inline-block rounded-full border border-[#aebbb0] px-7 py-4 font-semibold transition hover:bg-white"
          >
            Already a member? Choose your cause
          </Link>
        </div>
      </section>
    </main>
  );
}
