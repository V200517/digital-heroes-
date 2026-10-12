import Link from "next/link";
import { charities } from "@/lib/charities";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f4ed] text-[#10231d]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          digital<span className="text-[#7c9b72]">.</span>HEROES
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#how-it-works" className="transition hover:text-[#7c9b72]">
            How it works
          </a>
          <a href="#charity" className="transition hover:text-[#7c9b72]">
            Charity
          </a>
          <a href="#draw" className="transition hover:text-[#7c9b72]">
            The draw
          </a>
          <a href="#pricing" className="transition hover:text-[#7c9b72]">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:text-[#78966e] sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#10231d] px-5 py-3 text-sm font-semibold text-white transition hover:scale-105"
          >
            Start playing
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-14 lg:px-10 lg:pt-24">
        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#dce6d6] blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#e8dfc9] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[#cbd5c5] bg-white/60 px-4 py-2 text-sm font-medium">
              Your game. Their future.
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Play better.
              <br />
              <span className="text-[#78966e]">Give bigger.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#53635d]">
              A new way to turn your golf performance into meaningful impact.
              Track your golf scores, choose a cause, and explore Digital Heroes
              membership. Membership payments and prize draws are not active yet.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/signup"
                className="rounded-full bg-[#10231d] px-7 py-4 text-center font-semibold text-white transition hover:-translate-y-1"
              >
                Start your journey →
              </a>

              <a
                href="#how-it-works"
                className="rounded-full border border-[#aebbb0] bg-white/60 px-7 py-4 text-center font-semibold transition hover:bg-white"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex gap-10 text-sm">
              <div>
                <p className="text-2xl font-bold">Scores</p>
                <p className="mt-1 text-[#68766f]">tracked in your member area</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Causes</p>
                <p className="mt-1 text-[#68766f]">choose one to support</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Member area</p>
                <p className="mt-1 text-[#68766f]">scores and cause choice</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-[2rem] bg-[#10231d] p-5 shadow-2xl">
              <div className="rounded-[1.5rem] bg-[#dfe7da] p-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">PRODUCT PREVIEW</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    EXAMPLE
                  </span>
                </div>

                <div className="mt-14">
                  <p className="text-sm text-[#647269]">Planned charity share</p>
                  <p className="mt-2 text-6xl font-semibold">10%</p>
                  <p className="mt-2 text-[#59695e]">
                    of each membership contribution, once memberships are active.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-gray-500">Scores</p>
                    <p className="mt-2 text-xl font-bold">Golf</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-gray-500">Draws</p>
                    <p className="mt-2 text-xl font-bold">Cause</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs text-gray-500">Impact</p>
                    <p className="mt-2 text-xl font-bold">Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
              Simple by design
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Four steps. One bigger purpose.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Join", "Review the proposed monthly or yearly plans."],
              ["02", "Track", "Add your latest Stableford golf scores."],
              ["03", "Play", "Monthly prize draws are planned but not active yet."],
              ["04", "Give", "Choose a cause for a future membership."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-3xl border border-[#e2e6df] bg-[#f7f7f2] p-7"
              >
                <span className="text-sm font-semibold text-[#78966e]">
                  {number}
                </span>

                <h3 className="mt-10 text-2xl font-semibold">{title}</h3>

                <p className="mt-4 leading-7 text-[#647269]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity */}
      <section id="charity" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
                Give back
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Your membership can do more.
              </h2>

              <p className="mt-6 leading-8 text-[#647269]">
                Members can save a cause choice now. The intended membership
                model allocates at least 10% of each subscription contribution
                to that cause when payments are active.
              </p>

              <a
                href="/charities"
                className="mt-8 inline-block rounded-full bg-[#10231d] px-6 py-3 font-semibold text-white"
              >
                Explore charities →
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {charities.map((charity) => (
                <div
                  key={charity.name}
                  className="rounded-3xl bg-[#e1e8dc] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl">
                    ✦
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">{charity.name}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#647269]">
                    {charity.description}
                  </p>

                  <p className="mt-6 text-sm font-semibold">{charity.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Draw */}
      <section id="draw" className="bg-[#10231d] px-6 py-24 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b7c9ad]">
              Monthly draw
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your scores could become your lucky numbers.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-[#c2cec6]">
              Monthly draws and 3-number, 4-number and 5-number prize tiers are
              planned features. Draws are not currently running.
            </p>

            <a
              href="/pricing"
              className="mt-8 inline-block rounded-full bg-white px-7 py-4 font-semibold text-[#10231d]"
            >
              Become a member →
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm text-[#b7c9ad]">EXAMPLE PRIZE ALLOCATION</p>

            <p className="mt-4 text-5xl font-semibold">Example</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span>5-number match</span>
                <span className="font-semibold">40%</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span>4-number match</span>
                <span className="font-semibold">35%</span>
              </div>

              <div className="flex items-center justify-between">
                <span>3-number match</span>
                <span className="font-semibold">25%</span>
              </div>
            </div>
          </div>

          <p className="text-sm leading-6 text-[#aebbb3] lg:col-span-2">
            Prize structure shown for illustration only. No prize pool or draw is active.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
              Membership
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Pick your way to play.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#dfe5dc] p-8">
              <p className="text-sm font-semibold text-[#78966e]">MONTHLY</p>

              <h3 className="mt-5 text-4xl font-semibold">₹499</h3>
              <p className="mt-2 text-[#68766f]">per month</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>✓ Monthly draw participation</li>
                <li>✓ Score tracking</li>
                <li>✓ Choose your charity</li>
              </ul>

              <a
                href="/signup"
                className="mt-8 block rounded-full bg-[#10231d] px-6 py-4 text-center font-semibold text-white"
              >
                Choose monthly
              </a>
            </div>

            <div className="rounded-[2rem] bg-[#e1e8dc] p-8">
              <p className="text-sm font-semibold text-[#78966e]">YEARLY</p>

              <h3 className="mt-5 text-4xl font-semibold">₹4,999</h3>
              <p className="mt-2 text-[#68766f]">per year · save more</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>✓ Monthly draw participation</li>
                <li>✓ Score tracking</li>
                <li>✓ Choose your charity</li>
              </ul>

              <a
                href="/signup"
                className="mt-8 block rounded-full bg-[#10231d] px-6 py-4 text-center font-semibold text-white"
              >
                Choose yearly
              </a>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-[#68766f]">
            These are proposed prices. Membership checkout and monthly draws
            are not active yet.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#10231d] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="text-xl font-bold">
              digital<span className="text-[#91ad86]">.</span>HEROES
            </p>
            <p className="mt-2 text-sm text-[#aebbb3]">
              Play your game. Give something back.
            </p>
          </div>

          <p className="text-sm text-[#aebbb3]">
            © 2026 Digital Heroes
          </p>
        </div>
      </footer>
    </main>
  );
}
