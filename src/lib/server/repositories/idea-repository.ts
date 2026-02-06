import type { Phase } from "@/lib/contracts/idea";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function listIdeas(ownerId: string) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("ideas")
    .select("*")
    .eq("owner_id", ownerId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createIdea(ownerId: string, input: { title: string; summary?: string }) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("ideas")
    .insert({
      owner_id: ownerId,
      title: input.title,
      summary: input.summary ?? "",
      status: "draft",
      current_phase: "extract",
      metadata: {},
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getIdea(ownerId: string, ideaId: string) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("ideas")
    .select("*")
    .eq("owner_id", ownerId)
    .eq("id", ideaId)
    .single();
  if (error) throw error;
  return data;
}

export async function patchIdea(
  ownerId: string,
  ideaId: string,
  patch: Partial<{ title: string; summary: string; status: string; current_phase: string }>,
) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("ideas")
    .update(patch)
    .eq("owner_id", ownerId)
    .eq("id", ideaId)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function getIdeaContext(ownerId: string, ideaId: string) {
  const db = createSupabaseServerClient();
  const [assumptions, evidence, constraints, questions, decisions] = await Promise.all([
    db.from("idea_assumptions").select("*").eq("owner_id", ownerId).eq("idea_id", ideaId),
    db.from("idea_evidence").select("*").eq("owner_id", ownerId).eq("idea_id", ideaId),
    db.from("idea_constraints").select("*").eq("owner_id", ownerId).eq("idea_id", ideaId),
    db.from("idea_open_questions").select("*").eq("owner_id", ownerId).eq("idea_id", ideaId),
    db.from("idea_decisions").select("*").eq("owner_id", ownerId).eq("idea_id", ideaId),
  ]);

  for (const result of [assumptions, evidence, constraints, questions, decisions]) {
    if (result.error) throw result.error;
  }

  return {
    assumptions: assumptions.data ?? [],
    evidence: evidence.data ?? [],
    constraints: constraints.data ?? [],
    openQuestions: questions.data ?? [],
    decisions: decisions.data ?? [],
  };
}

export async function createPhaseRun(ownerId: string, ideaId: string, phase: Phase) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("idea_phase_runs")
    .insert({
      owner_id: ownerId,
      idea_id: ideaId,
      phase,
      status: "running",
      started_at: new Date().toISOString(),
      output: {},
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function completePhaseRun(runId: string, output: Record<string, unknown>) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("idea_phase_runs")
    .update({
      status: "done",
      completed_at: new Date().toISOString(),
      output,
    })
    .eq("id", runId)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function failPhaseRun(runId: string, message: string) {
  const db = createSupabaseServerClient();
  const { error } = await db
    .from("idea_phase_runs")
    .update({
      status: "blocked",
      error: message,
      completed_at: new Date().toISOString(),
    })
    .eq("id", runId);
  if (error) throw error;
}

export async function updateIdeaPhase(ideaId: string, phase: Phase) {
  const db = createSupabaseServerClient();
  const { error } = await db
    .from("ideas")
    .update({
      current_phase: phase,
      status: phase === "build" ? "completed" : "active",
    })
    .eq("id", ideaId);
  if (error) throw error;
}

export async function addActivity(
  ownerId: string,
  ideaId: string,
  phaseRunId: string | null,
  lane: "search" | "analyze" | "organize" | "decide" | "output",
  message: string,
  payload: Record<string, unknown> = {},
) {
  const db = createSupabaseServerClient();
  const { error } = await db.from("idea_agent_activity").insert({
    owner_id: ownerId,
    idea_id: ideaId,
    phase_run_id: phaseRunId,
    lane,
    message,
    payload,
  });
  if (error) throw error;
}

export async function listActivities(ownerId: string, ideaId: string) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("idea_agent_activity")
    .select("*")
    .eq("owner_id", ownerId)
    .eq("idea_id", ideaId)
    .order("created_at", { ascending: false })
    .limit(80);
  if (error) throw error;
  return data ?? [];
}

export async function getLatestPhaseRun(ownerId: string, ideaId: string, phase: Phase) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("idea_phase_runs")
    .select("*")
    .eq("owner_id", ownerId)
    .eq("idea_id", ideaId)
    .eq("phase", phase)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function appendDecision(ownerId: string, ideaId: string, decision: string, rationale: string) {
  const db = createSupabaseServerClient();
  const { error } = await db.from("idea_decisions").insert({
    owner_id: ownerId,
    idea_id: ideaId,
    decision,
    rationale,
    alternatives: [],
  });
  if (error) throw error;
}
