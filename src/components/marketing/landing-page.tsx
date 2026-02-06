"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-18 lg:px-8">
        <div className="soft-orb pointer-events-none absolute top-8 right-[15%] h-72 w-72 rounded-full opacity-85 blur-[2px]" />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-5xl space-y-7 text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">Idea Foundry Platform</p>
          <h1 className="section-title text-5xl md:text-7xl">
            The Critical Thinking
            <br />
            Production Engine
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            Structure signal from noise. Interrogate assumptions. Ground your direction in evidence.
            Execute only when the idea has passed every quality gate.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full border border-white/20 bg-white px-6 text-black hover:bg-white/90">
              <Link href="/app">
                Open Workspace
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title text-4xl md:text-5xl">About</h2>
          <p className="max-w-xl text-xs leading-6 text-white/60 uppercase tracking-[0.12em]">
            IdeaOS is a co-thinking SaaS for founders and teams who demand
            rigor before roadmap commitment.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Card className="outline-card">
            <CardContent className="p-5 text-sm leading-7 text-white/70">
              We convert raw thoughts into decision-ready execution plans with a phased reasoning engine.
              Every assumption, evidence point, and decision is persisted so strategy does not reset each session.
            </CardContent>
          </Card>
          {[
            { metric: "100+", label: "validated concepts" },
            { metric: "52", label: "founder teams" },
            { metric: "5", label: "active markets" },
          ].map((stat) => (
            <Card key={stat.label} className="outline-card">
              <CardContent className="flex h-full flex-col items-start justify-center p-5">
                <p className="text-3xl font-semibold">{stat.metric}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="section-title text-4xl md:text-5xl">Our Services</h2>
          <Button asChild variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-black">
            <Link href="/features">Browse</Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Idea Development",
              body: "Extract phase dedupes notes, links, and transcripts into the first structured graph.",
            },
            {
              title: "Critical Interrogation",
              body: "Interrogate phase pressure-tests assumptions with adversarial prompts and risk checks.",
            },
            {
              title: "Grounding",
              body: "Ground phase links evidence and market signals directly to each hypothesis.",
            },
            {
              title: "Execution Scope",
              body: "Plan phase turns validated learning into MVP scope, ICP and differentiated value.",
            },
            {
              title: "Build Bridge",
              body: "Build phase outputs implementation path and handoff artifacts for product execution.",
            },
          ].map((service) => (
            <Card key={service.title} className="outline-card md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base uppercase">
                  <CircleDot className="size-4 text-white/80" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-white/65">{service.body}</CardContent>
            </Card>
          ))}
          <Card className="soft-orb outline-card min-h-44 md:col-span-1" />
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pt-10 pb-20 lg:px-8">
        <div className="soft-orb pointer-events-none absolute right-8 bottom-0 h-56 w-56 rounded-full opacity-80" />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title text-4xl md:text-6xl">
            Special Offer
            <br />
            For New Clients
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65">
            Start with a strategic Foundry onboarding and ship your first decision-grade idea brief in 7 days.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-full border border-white/20 bg-white px-7 text-black hover:bg-white/90">
            <Link href="/pricing">
              Choose Plan
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
