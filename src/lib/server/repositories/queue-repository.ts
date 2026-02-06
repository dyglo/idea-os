import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Phase } from "@/lib/contracts/idea";

export async function enqueuePhaseRun(input: {
  ownerId: string;
  ideaId: string;
  phase: Phase;
  phaseRunId: string;
  payload: Record<string, unknown>;
}) {
  const db = createSupabaseServerClient();
  const { data, error } = await db
    .from("ops_job_queue")
    .insert({
      owner_id: input.ownerId,
      idea_id: input.ideaId,
      job_type: "phase_run",
      phase: input.phase,
      phase_run_id: input.phaseRunId,
      status: "queued",
      payload: input.payload,
      idempotency_key: `${input.ideaId}:${input.phase}:${input.phaseRunId}`,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

