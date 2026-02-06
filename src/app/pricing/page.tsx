import Link from "next/link";
import { SiteShell } from "@/components/marketing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Personal Thinker",
    price: "$39/mo",
    points: ["Up to 5 active ideas", "Core Foundry phases", "Single-user workspace"],
  },
  {
    name: "Builder / Founder",
    price: "$99/mo",
    points: ["Unlimited active ideas", "Execution bridge outputs", "Export integrations"],
    featured: true,
  },
  {
    name: "Team",
    price: "$299+/mo",
    points: ["Shared workspaces", "Decision audit trails", "Advanced governance controls"],
  },
];

export default function PricingPage() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-7xl px-6 pt-30 pb-20 lg:px-12">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Pricing</p>
          <h1 className="section-title mt-5 text-5xl md:text-6xl">Pricing built around clarity leverage, not token counts.</h1>
          <p className="mt-5 text-[15px] leading-8 text-white/65">
            Choose the plan that matches your decision velocity and collaboration complexity.
          </p>
        </header>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`outline-card h-full ${plan.featured ? "border-white/45 bg-white/[0.06]" : ""}`}>
              <CardHeader>
                <CardTitle className="uppercase">{plan.name}</CardTitle>
                <p className="text-3xl font-semibold">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[13px] text-white/65">
                  {plan.points.map((point) => (
                    <li key={point} className="leading-7">• {point}</li>
                  ))}
                </ul>
                <Button asChild className={`mt-7 w-full rounded-full ${plan.featured ? "bg-white text-black hover:bg-white/90" : "border border-white/30 bg-transparent text-white hover:bg-white hover:text-black"}`} variant={plan.featured ? "default" : "outline"}>
                  <Link href="/app">{plan.featured ? "Start Founder Plan" : "Get Started"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
