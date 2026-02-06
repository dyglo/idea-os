import { getRequestUserId } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/http";
import { listActivities } from "@/lib/server/repositories/idea-repository";

type Params = { params: Promise<{ ideaId: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId } = await params;
    const items = await listActivities(userId, ideaId);
    return ok({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

