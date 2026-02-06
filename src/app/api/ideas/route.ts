import { createIdeaSchema } from "@/lib/contracts/idea";
import { getRequestUserId } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/http";
import { createIdea, listIdeas } from "@/lib/server/repositories/idea-repository";

export async function GET() {
  try {
    const userId = await getRequestUserId();
    const ideas = await listIdeas(userId);
    return ok({ ideas });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = createIdeaSchema.parse(await request.json());
    const userId = await getRequestUserId();
    const idea = await createIdea(userId, body);
    return ok({ idea }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

