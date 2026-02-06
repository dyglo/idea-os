import { SiteShell } from "@/components/marketing/site-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const phases = [
  {
    name: "Extract",
    text: "Convert messy notes, links, and voice into structured problem signals.",
  },
  {
    name: "Interrogate",
    text: "Stress-test assumptions, expose contradictions, and define failure conditions.",
  },
  {
    name: "Ground",
    text: "Attach evidence and market signals directly to assumptions and claims.",
  },
  {
    name: "Plan",
    text: "Produce execution-ready outputs: ICP, differentiation, MVP scope, risks.",
  },
  {
    name: "Build",
    text: "Bridge to implementation path with clear stack and sequencing recommendations.",
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.16em] text-white/60">How It Works</p>
          <h1 className="section-title mt-4">Five phases. One continuous reasoning state.</h1>
          <p className="mt-4 text-base leading-8 text-white/65">
            The Foundry process enforces clarity gates before progression and preserves rationale across the full lifecycle.
          </p>
        </header>
        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {phases.map((phase, index) => (
            <Card key={phase.name} className="outline-card h-full">
              <CardHeader>
                <p className="text-xs font-mono text-white/55">0{index + 1}</p>
                <CardTitle className="text-lg uppercase">{phase.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-white/65">{phase.text}</CardContent>
            </Card>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
