import { FoundryWorkspace } from "@/components/foundry/workspace";

type Params = { params: Promise<{ ideaId: string }> };

export default async function IdeaWorkspacePage({ params }: Params) {
  const { ideaId } = await params;
  return <FoundryWorkspace ideaId={ideaId} />;
}

