import { redirect } from "next/navigation";

type Params = { params: Promise<{ ideaId: string }> };

export default async function IdeaWorkspacePage({ params }: Params) {
  const { ideaId } = await params;
  redirect(`/app?idea=${ideaId}`);
}
