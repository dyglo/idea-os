import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen bg-background text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
