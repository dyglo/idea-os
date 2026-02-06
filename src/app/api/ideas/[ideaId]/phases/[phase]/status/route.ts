import { phaseSchema } from "@/lib/contracts/idea";
import { getRequestUserId } from "@/lib/server/auth";
import { fail, handleApiError, ok } from "@/lib/server/http";
import { getLatestPhaseRun } from "@/lib/server/repositories/idea-repository";

type Params = { params: Promise<{ ideaId: string; phase: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId, phase: phaseParam } = await params;
    const phase = phaseSchema.safeParse(phaseParam);
    if (!phase.success) return fail("Invalid phase", 400);
    const run = await getLatestPhaseRun(userId, ideaId, phase.data);
    return ok({ run });
  } catch (error) {
    return handleApiError(error);
  }
}

