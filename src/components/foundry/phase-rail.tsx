"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Phase } from "@/lib/contracts/idea";
import { CheckCircle2, Circle, LoaderCircle } from "lucide-react";

gsap.registerPlugin(useGSAP);

const phases: Phase[] = ["extract", "interrogate", "ground", "plan", "build"];

export function PhaseRail({ currentPhase }: { currentPhase: Phase }) {
  const container = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentIndex = phases.indexOf(currentPhase);
  const progress = ((currentIndex + 1) / phases.length) * 100;

  useGSAP(
    () => {
      if (!progressRef.current) return;
      gsap.to(progressRef.current, {
        height: `${progress}%`,
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { scope: container, dependencies: [progress] },
  );

  useEffect(() => {
    if (!container.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      container.current.querySelectorAll("[data-node='true']"),
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: "power2.out" },
    );
  }, []);

  return (
    <div ref={container} className="relative flex flex-col gap-3 py-2">
      <div className="absolute top-4 bottom-4 left-[0.65rem] w-px bg-border" />
      <div
        ref={progressRef}
        className="absolute top-4 left-[0.65rem] w-px bg-primary"
        style={{ height: `${progress}%` }}
      />
      {phases.map((phase, index) => {
        const isPast = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div key={phase} data-node="true" className="relative flex items-center gap-3">
            <div className="z-10 rounded-full bg-background p-[2px]">
              {isPast ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : isCurrent ? (
                <LoaderCircle className="size-4 animate-spin text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground" />
              )}
            </div>
            <p className={`text-sm capitalize ${isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              {phase}
            </p>
          </div>
        );
      })}
    </div>
  );
}

