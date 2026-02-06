/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Command,
  Database,
  FileOutput,
  Lightbulb,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PhaseRail } from "@/components/foundry/phase-rail";
import type { Phase } from "@/lib/contracts/idea";

const phaseOrder: Phase[] = ["extract", "interrogate", "ground", "plan", "build"];

type WorkspaceProps = {
  ideaId: string;
};

type IdeaDto = {
  id: string;
  title: string;
  summary: string;
  current_phase: Phase;
  status: string;
};

export function FoundryWorkspace({ ideaId }: WorkspaceProps) {
  const [idea, setIdea] = useState<IdeaDto | null>(null);
  const [context, setContext] = useState<Record<string, unknown>>({});
  const [activities, setActivities] = useState<
    { id: string; lane: string; message: string; created_at: string }[]
  >([]);
  const [running, setRunning] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  const currentPhase = idea?.current_phase ?? "extract";
  const nextPhase = useMemo(() => {
    const i = phaseOrder.indexOf(currentPhase);
    return phaseOrder[Math.min(i + 1, phaseOrder.length - 1)];
  }, [currentPhase]);

  const loadWorkspace = useCallback(async () => {
    const [ideaRes, ctxRes, actRes] = await Promise.all([
      fetch(`/api/ideas/${ideaId}`, { cache: "no-store" }),
      fetch(`/api/ideas/${ideaId}/context`, { cache: "no-store" }),
      fetch(`/api/ideas/${ideaId}/activities`, { cache: "no-store" }),
    ]);
    const ideaData = await ideaRes.json();
    const contextData = await ctxRes.json();
    const activityData = await actRes.json();
    setIdea(ideaData.idea);
    setContext(contextData);
    setActivities(activityData.items ?? []);
  }, [ideaId]);

  async function runPhase(phase: Phase) {
    setRunning(true);
    await fetch(`/api/ideas/${ideaId}/phases/${phase}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setRunning(false);
    await loadWorkspace();
  }

  async function exportPlan() {
    const response = await fetch(`/api/ideas/${ideaId}/export`, { method: "POST" });
    const data = await response.json();
    await navigator.clipboard.writeText(data.markdown ?? "");
  }

  useEffect(() => {
    void loadWorkspace();
    const timer = setInterval(() => void loadWorkspace(), 10000);
    return () => clearInterval(timer);
  }, [loadWorkspace]);

  return (
    <main className="grid min-h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)_340px]">
      <aside className="rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-medium">Idea Library</p>
          <Button asChild variant="ghost" size="icon">
            <Link href="/ideas">
              <ChevronLeft className="size-4" />
            </Link>
          </Button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Current idea in Foundry mode.</p>
        <div className="rounded-xl border border-border/70 p-3">
          <p className="line-clamp-2 text-sm font-medium">{idea?.title ?? "Loading..."}</p>
          <p className="mt-1 text-xs text-muted-foreground">{idea?.summary ?? ""}</p>
          <Badge className="mt-3" variant="secondary">
            {idea?.status ?? "draft"}
          </Badge>
        </div>
        <Separator className="my-4" />
        <PhaseRail currentPhase={currentPhase} />
      </aside>

      <section className="flex min-h-[calc(100vh-2rem)] flex-col rounded-2xl border border-border/70 bg-card/60 p-4">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Step Canvas</p>
            <h1 className="text-2xl font-semibold capitalize">{currentPhase}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Command className="size-4" />
              ⌘K
            </Button>
            <Button onClick={() => void runPhase(currentPhase)} disabled={running} className="gap-2">
              <PlayCircle className="size-4" />
              Run Foundry
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid flex-1 gap-4 lg:grid-cols-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="size-4 text-primary" />
                  Critical Questioning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                <ul className="space-y-2">
                  <li>What assumption must be true for this to work?</li>
                  <li>Who loses if this succeeds?</li>
                  <li>What kills this in 90 days?</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="size-4 text-primary" />
                  Grounded Signals
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Evidence and assumptions are tied in a durable idea graph. The server owns orchestration and writes all state into
                Supabase through typed contracts.
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-border/70 bg-background/70 p-3">
          <p className="text-sm text-muted-foreground">Next phase recommendation: <span className="font-medium capitalize text-foreground">{nextPhase}</span></p>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => void runPhase(nextPhase)}>
              Next Step
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="secondary" className="gap-2" onClick={() => void exportPlan()}>
              <FileOutput className="size-4" />
              Export
            </Button>
          </div>
        </div>
      </section>

      <aside
        className={`rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur transition-all duration-300 ${panelOpen ? "w-full" : "w-16"}`}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className={`font-medium ${panelOpen ? "block" : "hidden"}`}>Context Panel</p>
          <Button size="icon" variant="ghost" onClick={() => setPanelOpen((v) => !v)}>
            {panelOpen ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
        {panelOpen ? (
          <ScrollArea className="h-[calc(100vh-8rem)] pr-1">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {Array.isArray(context.assumptions) ? `${context.assumptions.length} tracked` : "No assumptions yet"}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Evidence</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {Array.isArray(context.evidence) ? `${context.evidence.length} sources mapped` : "No evidence yet"}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Bot className="size-4 text-primary" />
                    Agent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  {activities.slice(0, 12).map((item) => (
                    <div key={item.id} className="rounded-md border border-border/60 p-2">
                      <p className="font-medium">{item.message}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{item.lane}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        ) : null}
      </aside>
    </main>
  );
}
