import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-black/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 py-10 text-xs uppercase tracking-[0.14em] text-white/60 md:flex-row lg:px-8">
        <p>IdeaOS Foundry © 2026</p>
        <div className="flex gap-4">
          <Link href="/product">Product</Link>
          <Link href="/features">Features</Link>
          <Link href="/how-it-works">Process</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/app">App</Link>
        </div>
      </div>
    </footer>
  );
}
