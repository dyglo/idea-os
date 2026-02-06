import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-[11px] font-medium tracking-widest text-white/30 md:flex-row lg:px-12 uppercase">
        <p>ideaos<span className="text-white/10">.</span> © 2026</p>
        <div className="flex gap-8">
          <Link href="/product" className="hover:text-white transition-colors">Project</Link>
          <Link href="/features" className="hover:text-white transition-colors">Team</Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">About</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
