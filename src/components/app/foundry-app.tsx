/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Bot, FileOutput, PlayCircle, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhaseRail } from "@/components/foundry/phase-rail";
import type { Phase } from "@/lib/contracts/idea";

type Idea = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "active" | "paused" | "completed";
  current_phase: Phase;
};

const phaseOrder: Phase[] = ["extract", "interrogate", "ground", "plan", "build"];

export function FoundryApp() {
  const searchParams = useSearchParams();
  const ideaParam = searchParams.get("idea");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [context, setContext] = useState<Record<string, unknown>>({});
  const [activities, setActivities] = useState<{ id: string; message: string; lane: string }[]>([]);
  const [running, setRunning] = useState(false);

  const selected = useMemo(
    () => ideas.find((i) => i.id === selectedId) ?? null,
    [ideas, selectedId],
  );

  const nextPhase = useMemo(() => {
    if (!selected) return "extract" as Phase;
    const idx = phaseOrder.indexOf(selected.current_phase);
    return phaseOrder[Math.min(idx + 1, phaseOrder.length - 1)];
  }, [selected]);

  const loadIdeas = useCallback(async () => {
    const res = await fetch("/api/ideas", { cache: "no-store" });
    const data = await res.json();
    const rows = (data.ideas ?? []) as Idea[];
    setIdeas(rows);
    if (!selectedId && rows.length > 0) {
      const target = ideaParam && rows.some((r) => r.id === ideaParam) ? ideaParam : rows[0].id;
      setSelectedId(target);
    }
  }, [ideaParam, selectedId]);

  const loadDetails = useCallback(async (ideaId: string) => {
    const [ctxRes, activityRes] = await Promise.all([
      fetch(`/api/ideas/${ideaId}/context`, { cache: "no-store" }),
      fetch(`/api/ideas/${ideaId}/activities`, { cache: "no-store" }),
    ]);
    const ctx = await ctxRes.json();
    const act = await activityRes.json();
    setContext(ctx);
    setActivities(act.items ?? []);
  }, []);

  async function createIdea() {
    if (title.trim().length < 3) return;
    await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, summary }),
    });
    setTitle("");
    setSummary("");
    await loadIdeas();
  }

  async function runPhase(phase: Phase) {
    if (!selected) return;
    setRunning(true);
    await fetch(`/api/ideas/${selected.id}/phases/${phase}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setRunning(false);
    await loadIdeas();
    await loadDetails(selected.id);
  }

  async function exportPlan() {
    if (!selected) return;
    const res = await fetch(`/api/ideas/${selected.id}/export`, { method: "POST" });
    const data = await res.json();
    await navigator.clipboard.writeText(data.markdown ?? "");
  }

  useEffect(() => {
    void loadIdeas();
  }, [loadIdeas]);

  useEffect(() => {
    if (!selectedId) return;
    void loadDetails(selectedId);
  }, [selectedId, loadDetails]);

  const filtered = ideas.filter((i) =>
    `${i.title} ${i.summary}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1600px] grid-cols-1 gap-4 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:px-8">
      <aside className="outline-card p-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">Idea Library</h2>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="rounded-full border-white/20 bg-white/[0.03] pl-9 text-white placeholder:text-white/35" placeholder="Search ideas" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="mt-4 space-y-2">
          {filtered.map((idea) => (
            <button
              key={idea.id}
              onClick={() => setSelectedId(idea.id)}
              className={`w-full rounded-xl border p-3 text-left transition-colors ${
              selectedId === idea.id ? "border-white/40 bg-white/10" : "border-white/20 hover:bg-white/6"
              }`}
            >
              <p className="line-clamp-1 text-sm font-medium">{idea.title}</p>
              <p className="line-clamp-1 text-xs text-white/55">{idea.summary || "No summary yet."}</p>
            </button>
          ))}
        </div>
        <Separator className="my-4" />
        <h3 className="text-sm font-medium">Create New Idea</h3>
        <div className="mt-2 space-y-2">
          <Input className="rounded-full border-white/20 bg-white/[0.03] text-white placeholder:text-white/35" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input className="rounded-full border-white/20 bg-white/[0.03] text-white placeholder:text-white/35" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Button className="w-full gap-2 rounded-full border border-white/20 bg-white text-black hover:bg-white/90" onClick={() => void createIdea()}>
            <Plus className="size-4" />
            Add Idea
          </Button>
        </div>
      </aside>

      <section className="outline-card flex min-h-[70vh] flex-col p-4">
        {selected ? (
          <>
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/55">Foundry Canvas</p>
                <h1 className="text-2xl font-semibold">{selected.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize border border-white/20 bg-white/[0.06] text-white">
                  {selected.current_phase}
                </Badge>
                <Button onClick={() => void runPhase(selected.current_phase)} disabled={running} className="gap-2 rounded-full border border-white/20 bg-white text-black hover:bg-white/90">
                  <PlayCircle className="size-4" />
                  Run Phase
                </Button>
              </div>
            </header>

            <div className="grid flex-1 gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
              <Card>
                <CardContent className="pt-6">
                  <PhaseRail currentPhase={selected.current_phase} />
                </CardContent>
              </Card>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.current_phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  className="grid gap-4 lg:grid-cols-2"
                >
                  <Card className="outline-card">
                    <CardHeader>
                      <CardTitle className="text-base uppercase">Critical Interrogation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm leading-7 text-white/65">
                      <p>What assumption must be true for this to work?</p>
                      <p>Who loses if this succeeds?</p>
                      <p>What would kill this within 90 days?</p>
                    </CardContent>
                  </Card>
                  <Card className="outline-card">
                    <CardHeader>
                      <CardTitle className="text-base uppercase">Execution Framing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm leading-7 text-white/65">
                      <p>Current phase: <span className="font-medium capitalize text-foreground">{selected.current_phase}</span></p>
                      <p>Recommended next: <span className="font-medium capitalize text-foreground">{nextPhase}</span></p>
                      <p>Server-managed, evidence-linked state ensures auditability and continuity.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/20 bg-black/45 p-3">
              <p className="text-sm text-white/65">Ready for the next gate: <span className="font-medium capitalize text-white">{nextPhase}</span></p>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 rounded-full border-white/25 bg-transparent text-white hover:bg-white hover:text-black" onClick={() => void runPhase(nextPhase)}>
                  Next Step
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="secondary" className="gap-2 rounded-full border border-white/20 bg-white text-black hover:bg-white/90" onClick={() => void exportPlan()}>
                  <FileOutput className="size-4" />
                  Export
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Card className="h-full">
            <CardContent className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Create or select an idea to open the workspace.
            </CardContent>
          </Card>
        )}
      </section>

      <aside className="outline-card p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
          <Bot className="size-4 text-primary" />
          Working Memory
        </h2>
        <ScrollArea className="mt-3 h-[calc(100vh-11rem)] pr-2">
          <div className="space-y-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-white/65">
                {Array.isArray(context.assumptions) ? `${context.assumptions.length} tracked` : "No assumptions"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Evidence</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-white/65">
                {Array.isArray(context.evidence) ? `${context.evidence.length} linked` : "No evidence"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Decisions</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-white/65">
                {Array.isArray(context.decisions) ? `${context.decisions.length} logged` : "No decisions"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Agent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {activities.slice(0, 12).map((item) => (
                  <div key={item.id} className="rounded-md border border-border/65 p-2">
                    <p className="text-xs">{item.message}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/50">{item.lane}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </aside>
    </main>
  );
}
