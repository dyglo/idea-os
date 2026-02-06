import Link from "next/link";
import { ArrowRight, Boxes, ClipboardCheck, DatabaseZap, SplitSquareVertical } from "lucide-react";
import { SiteShell } from "@/components/marketing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductPage() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-7xl px-6 pt-30 pb-20 lg:px-12">
        <section className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Product Overview</p>
          <h1 className="section-title text-5xl md:text-6xl">The Foundry is a decision system, not a text box.</h1>
          <p className="text-[15px] leading-8 text-white/65">
            IdeaOS treats an idea as a first-class object with assumptions, evidence, constraints, open questions,
            and decisions tracked across its lifecycle.
          </p>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          {[
            { icon: Boxes, title: "Idea Object Core", body: "Stateful object model with durable lifecycle memory." },
            { icon: SplitSquareVertical, title: "Phase-Gated Flow", body: "Extract → Interrogate → Ground → Plan → Build." },
            { icon: DatabaseZap, title: "Evidence Graph", body: "Signals tied to assumptions and confidence weighting." },
            { icon: ClipboardCheck, title: "Decision Audit", body: "Decision logs and rationale for every material step." },
          ].map((item) => (
            <Card key={item.title} className="outline-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base uppercase">
                  <item.icon className="size-4 text-white/80" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[13px] leading-7 text-white/65">{item.body}</CardContent>
            </Card>
          ))}
        </section>

        <section className="outline-card mt-14 p-7 md:p-8">
          <h2 className="text-2xl font-semibold uppercase">From strategic ambiguity to executable scope.</h2>
          <p className="mt-4 max-w-3xl text-[13px] leading-7 text-white/65">
            Foundry outputs planning artifacts your product and engineering teams can execute immediately:
            problem statement, ICP, differentiation, MVP scope, risk register, and execution path recommendation.
          </p>
          <Button asChild className="mt-7 gap-2 rounded-full border border-white/25 bg-white px-6 text-black hover:bg-white/90">
            <Link href="/app">
              Open Workspace
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </main>
    </SiteShell>
  );
}
