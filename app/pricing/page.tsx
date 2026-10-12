import Link from "next/link";

const plans = [
  {
    name: "Monthly",
    price: "₹499",
    period: "per month",
    description: "A flexible way to play and make an impact.",
    featured: false,
  },
  {
    name: "Yearly",
    price: "₹4,999",
    period: "per year · save more",
    description: "A full year of golf, draws, and giving back.",
    featured: true,
  },
];

const benefits = [
  "Monthly draw participation",
  "Golf score tracking",
  "Choose your charity",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ed] text-[#10231d]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          digital<span className="text-[#7c9b72]">.</span>HEROES
        </Link>
        <a
          href="/login"
          className="text-sm font-semibold transition hover:text-[#78966e]"
        >
          Log in
        </a>
      </nav>

      <section className="px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#78966e]">
              Membership
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
              Pick your way to play.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#647269]">
              Every membership includes score tracking, monthly draw
              participation, and the chance to support a cause you believe in.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[2rem] p-8 ${
                  plan.featured
                    ? "bg-[#e1e8dc]"
                    : "border border-[#dfe5dc] bg-white"
                }`}
              >
                <p className="text-sm font-semibold uppercase text-[#78966e]">
                  {plan.name}
                </p>
                <h2 className="mt-5 text-4xl font-semibold">{plan.price}</h2>
                <p className="mt-2 text-[#68766f]">{plan.period}</p>
                <p className="mt-5 leading-7 text-[#647269]">
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-4 text-sm">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span aria-hidden="true" className="font-bold text-[#78966e]">
                        ✓
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href="/signup"
                  className="mt-8 block rounded-full bg-[#10231d] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
                >
                  Choose {plan.name.toLowerCase()}
                </a>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-[#68766f]">
            Membership checkout is not available yet. Create an account to get
            started.
          </p>
        </div>
      </section>
    </main>
  );
}
