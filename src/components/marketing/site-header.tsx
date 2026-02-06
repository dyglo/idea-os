"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Project" },
  { href: "/features", label: "Team" },
  { href: "/how-it-works", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          social<span className="text-white/60">.</span>
        </Link>
        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-10 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium transition-colors hover:text-white",
                  active ? "text-white" : "text-white/60",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="capsule-button"
          >
            Contact us
          </Link>
          <Button variant="ghost" size="icon-sm" className="md:hidden text-white">
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
