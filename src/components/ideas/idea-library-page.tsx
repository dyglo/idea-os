/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FolderKanban, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type IdeaRow = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "active" | "paused" | "completed";
  current_phase: "extract" | "interrogate" | "ground" | "plan" | "build";
  updated_at: string;
};

export function IdeaLibraryPage() {
  const [ideas, setIdeas] = useState<IdeaRow[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function loadIdeas() {
    const response = await fetch("/api/ideas", { cache: "no-store" });
    const data = await response.json();
    setIdeas(data.ideas ?? []);
  }

  async function create() {
    if (title.trim().length < 3) return;
    setLoading(true);
    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, summary }),
    });
    setLoading(false);
    if (response.ok) {
      setTitle("");
      setSummary("");
      await loadIdeas();
    }
  }

  useEffect(() => {
    void loadIdeas();
  }, []);

  const filtered = ideas.filter((idea) => {
    const q = search.toLowerCase();
    return idea.title.toLowerCase().includes(q) || idea.summary.toLowerCase().includes(q);
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:px-8">
      <header className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Idea Library</h1>
          <p className="text-sm text-muted-foreground">State-first workspace for high-rigor product thinking.</p>
        </div>
        <Button asChild>
          <Link href="/">Back Home</Link>
        </Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Create Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Working title"
              aria-label="Idea title"
            />
            <Input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="One-line summary"
              aria-label="Idea summary"
            />
            <Button onClick={create} disabled={loading} className="w-full gap-2">
              <Plus className="size-4" />
              Create
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="gap-3">
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="size-4 text-primary" />
              Active Ideas
            </CardTitle>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search title or summary..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ideas yet. Create the first one to open the Foundry.</p>
            ) : (
              filtered.map((idea) => (
                <Link
                  key={idea.id}
                  href={`/ideas/${idea.id}`}
                  className="block rounded-xl border border-border/70 p-4 transition-colors hover:bg-accent/35"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h2 className="text-base font-medium">{idea.title}</h2>
                    <Badge variant="secondary">{idea.current_phase}</Badge>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{idea.summary || "No summary yet."}</p>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
