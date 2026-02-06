import { phaseSchema, runPhaseRequestSchema } from "@/lib/contracts/idea";
import { runPhaseEngine } from "@/lib/server/engine/run-phase";
import { getRequestUserId } from "@/lib/server/auth";
import { fail, handleApiError, ok } from "@/lib/server/http";
import { createPhaseRun } from "@/lib/server/repositories/idea-repository";
import { enqueuePhaseRun } from "@/lib/server/repositories/queue-repository";

type Params = { params: Promise<{ ideaId: string; phase: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId, phase: phaseParam } = await params;
    const phase = phaseSchema.safeParse(phaseParam);
    if (!phase.success) return fail("Invalid phase", 400);

    const body = runPhaseRequestSchema.parse(await request.json().catch(() => ({})));
    const run = await createPhaseRun(userId, ideaId, phase.data);
    await enqueuePhaseRun({
      ownerId: userId,
      ideaId,
      phase: phase.data,
      phaseRunId: run.id,
      payload: body.contextDelta ?? {},
    });

    const result = await runPhaseEngine({
      ownerId: userId,
      ideaId,
      runId: run.id,
      phase: phase.data,
      contextDelta: body.contextDelta,
    });

    return ok({ run, result }, { status: 202 });
  } catch (error) {
    return handleApiError(error);
  }
}

