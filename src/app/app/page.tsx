import { Suspense } from "react";
import { FoundryApp } from "@/components/app/foundry-app";
import { SiteShell } from "@/components/marketing/site-shell";

export default function AppPage() {
  return (
    <SiteShell>
      <Suspense fallback={<main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-6 py-20 text-white/60">Loading workspace...</main>}>
        <FoundryApp />
      </Suspense>
    </SiteShell>
  );
}
