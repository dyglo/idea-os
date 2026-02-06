import { SiteShell } from "@/components/marketing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    group: "Thinking Engine",
    points: [
      "Assumption extraction and contradiction detection",
      "Adversarial questioning framework",
      "Phase completion gates with quality thresholds",
    ],
  },
  {
    group: "Evidence and Grounding",
    points: [
      "Competitor and market signal capture",
      "Citation-linked claims and confidence scoring",
      "Regulatory friction tracking (US/EU ready)",
    ],
  },
  {
    group: "Execution Readiness",
    points: [
      "MVP boundary definition and risk register",
      "Stack recommendation with rationale",
      "Export contracts for roadmap and build workflows",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
        <header className="max-w-3xl">
          <Badge variant="secondary" className="border border-white/20 bg-white/5 text-white">Features</Badge>
          <h1 className="section-title mt-4">Everything required to engineer ideas with rigor.</h1>
          <p className="mt-4 text-base leading-8 text-white/65">
            Built for teams that need clarity before execution and continuity after decisions.
          </p>
        </header>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.group} className="outline-card h-full">
              <CardHeader>
                <CardTitle className="text-base uppercase">{feature.group}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-white/65">
                  {feature.points.map((point) => (
                    <li key={point} className="leading-6">• {point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
