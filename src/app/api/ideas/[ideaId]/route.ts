import { patchIdeaSchema } from "@/lib/contracts/idea";
import { getRequestUserId } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/http";
import { getIdea, patchIdea } from "@/lib/server/repositories/idea-repository";

type Params = { params: Promise<{ ideaId: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId } = await params;
    const idea = await getIdea(userId, ideaId);
    return ok({ idea });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId } = await params;
    const patch = patchIdeaSchema.parse(await request.json());
    const mapped: Partial<{ title: string; summary: string; status: string; current_phase: string }> = {};
    if (patch.title) mapped.title = patch.title;
    if (patch.summary) mapped.summary = patch.summary;
    if (patch.status) mapped.status = patch.status;
    if (patch.currentPhase) mapped.current_phase = patch.currentPhase;
    const idea = await patchIdea(userId, ideaId, mapped);
    return ok({ idea });
  } catch (error) {
    return handleApiError(error);
  }
}
