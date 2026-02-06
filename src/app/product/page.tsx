import Link from "next/link";
import { ArrowRight, Boxes, ClipboardCheck, DatabaseZap, SplitSquareVertical } from "lucide-react";
import { SiteShell } from "@/components/marketing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductPage() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
        <section className="max-w-3xl space-y-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">Product Overview</p>
          <h1 className="section-title">The Foundry is a decision system, not a text box.</h1>
          <p className="text-base leading-8 text-white/65">
            IdeaOS treats an idea as a first-class object with assumptions, evidence, constraints, open questions,
            and decisions tracked across its lifecycle.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
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
              <CardContent className="text-sm text-white/65">{item.body}</CardContent>
            </Card>
          ))}
        </section>

        <section className="outline-card mt-12 p-6">
          <h2 className="text-2xl font-semibold uppercase">From strategic ambiguity to executable scope.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
            Foundry outputs planning artifacts your product and engineering teams can execute immediately:
            problem statement, ICP, differentiation, MVP scope, risk register, and execution path recommendation.
          </p>
          <Button asChild className="mt-5 gap-2 rounded-full border border-white/25 bg-white text-black hover:bg-white/90">
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
