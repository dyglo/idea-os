"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        {/* Background Orb */}
        <div className="iridescent-orb absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-6xl space-y-10"
        >
          <h1 className="text-5xl font-extrabold uppercase leading-[1.1] tracking-tight md:text-8xl lg:text-[110px]">
            The Idea Foundry
            <br />
            Production Engine
          </h1>

          <div className="mx-auto max-w-md space-y-8">
            <p className="text-[13px] leading-relaxed text-white/50">
              IdeaOS helps founders and product teams interrogate, structure, validate, and evolve ideas before committing engineering time.
            </p>

            <Link
              href="/app"
              className="group inline-flex items-center gap-2 border-capsule bg-white/5 hover:bg-white text-white hover:text-black transition-all"
            >
              Choose something
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-black/10">
                <ArrowRight className="size-3" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        {/* Decorative Orb */}
        <div className="iridescent-orb absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 opacity-40" />

        <div className="relative z-10">
          <h2 className="section-title mb-12 text-left">About</h2>

          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <p className="text-sm leading-relaxed text-white/50">
                Foundry treats each idea as a stateful object with assumptions, evidence, constraints, open questions, and decisions. Teams stop losing context between chats and start building with strategic continuity.
              </p>
              <Link href="/product" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:opacity-70 transition-opacity">
                More <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-12 lg:gap-20">
              {[
                { metric: "100+", label: "project" },
                { metric: "32", label: "partners" },
                { metric: "3", label: "offices" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-5xl font-bold tracking-tight">{stat.metric}</p>
                  <p className="text-sm font-medium text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="section-title text-left">Our Services</h2>
            <p className="max-w-md text-sm leading-relaxed text-white/40">
              Phase-guided modules that convert messy thoughts into execution-ready strategic artifacts.
            </p>
          </div>
          <Link
            href="/features"
            className="group inline-flex items-center gap-2 border-capsule bg-white/5 hover:bg-white text-white hover:text-black transition-all"
          >
            Choose
            <div className="flex size-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-black/10">
              <ArrowRight className="size-3" />
            </div>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: "01",
              title: "Extract",
              body: "Clean and cluster raw notes, docs, links, and dumps into coherent problem signals.",
              className: "md:col-span-1 lg:col-span-1 min-h-[280px]"
            },
            {
              id: "02",
              title: "Interrogate + Ground",
              body: "Pressure-test assumptions and attach evidence, market signals, and risks to each claim.",
              className: "md:col-span-1 lg:col-span-2 min-h-[280px]"
            },
            {
              id: "03",
              title: "Plan",
              body: "Generate decision-ready outputs: problem statement, ICP, differentiation, and MVP scope.",
              className: "bg-white text-black min-h-[280px]"
            },
            {
              id: "04",
              title: "Build Bridge",
              body: "Transition into implementation with stack recommendation and execution sequencing.",
              className: "md:col-span-1 lg:col-span-1 min-h-[280px]"
            },
          ].map((service) => (
            <div
              key={service.id}
              className={cn(
                "outline-card group relative flex flex-col justify-between p-8 transition-all hover:border-white/30",
                service.className,
                service.id === "03" ? "bg-white text-black" : ""
              )}
            >
              <div className="flex size-8 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                {service.id}
              </div>
              <div className="mt-12 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">{service.title}</h3>
                <p className={cn("text-xs leading-relaxed", service.id === "03" ? "text-black/60" : "text-white/40")}>
                  {service.body}
                </p>
              </div>
            </div>
          ))}
          {/* Decorative Card for Butterfly Placeholder */}
          <div className="outline-card relative flex min-h-[280px] items-center justify-center overflow-hidden lg:col-span-2">
            <div className="iridescent-orb absolute inset-0 opacity-30" />
            <div className="relative z-10 text-center">
              {/* Simplified Butterfly/Object representation */}
              <div className="flex items-center justify-center">
                <div className="size-32 rounded-full bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl" />
                <div className="absolute size-24 border-2 border-white/10 rounded-[40%_60%_70%_30%/40%_50%_60%_40%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center">
        {/* Background Orb */}
        <div className="iridescent-orb absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-40" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-10"
        >
          <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Special Offer
            <br />
            For New Clients
          </h2>

          <div className="mx-auto max-w-md space-y-8">
            <p className="text-[13px] leading-relaxed text-white/50">
              New founder teams get guided onboarding, process calibration, and first execution brief generation support.
            </p>

            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 border-capsule bg-white/5 hover:bg-white text-white hover:text-black transition-all"
            >
              Choose something
              <div className="flex size-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-black/10">
                <ArrowRight className="size-3" />
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
