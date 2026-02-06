import { getRequestUserId } from "@/lib/server/auth";
import { handleApiError, ok } from "@/lib/server/http";
import { getIdea, getIdeaContext, listActivities } from "@/lib/server/repositories/idea-repository";

type Params = { params: Promise<{ ideaId: string }> };

export async function POST(_request: Request, { params }: Params) {
  try {
    const userId = await getRequestUserId();
    const { ideaId } = await params;
    const [idea, context, activities] = await Promise.all([
      getIdea(userId, ideaId),
      getIdeaContext(userId, ideaId),
      listActivities(userId, ideaId),
    ]);

    const markdown = [
      `# ${idea.title}`,
      "",
      "## Summary",
      idea.summary || "No summary yet.",
      "",
      "## Assumptions",
      ...context.assumptions.map((item) => `- ${item.text} (${item.status})`),
      "",
      "## Evidence",
      ...context.evidence.map((item) => `- ${item.claim} [${item.source_type}]`),
      "",
      "## Decisions",
      ...context.decisions.map((item) => `- ${item.decision}`),
      "",
      "## Activity",
      ...activities.slice(0, 20).map((item) => `- ${item.message}`),
    ].join("\n");

    return ok({
      exportFormat: "markdown",
      generatedAt: new Date().toISOString(),
      markdown,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

