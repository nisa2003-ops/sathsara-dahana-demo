import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import VortexBackground from "@/src/components/ui/VortexBackground";
import FlipHTML5Embed from "./FlipHTML5Embed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-Souvenir 2026 | Sathsara Dahana",
  description: "Browse the official Sathsara Dahana 2026 E-Souvenir on FlipHTML5.",
  openGraph: {
    title: "Sathsara Dahana 2026 — E-Souvenir",
    description: "Browse our official event souvenir online.",
  },
};

export default function SouvenirPage() {
  return (
    <div className="relative min-h-screen bg-[#02040d] text-white pt-20 pb-8 sm:pt-32 sm:pb-16 px-2.5 sm:px-6 overflow-hidden flex flex-col justify-between">
      <VortexBackground />

      {/* Atmospheric ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[35rem] w-[55rem] max-w-[95vw] -translate-x-1/2 rounded-full bg-cyan-500/[0.1] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-[30rem] w-[40rem] rounded-full bg-blue-600/[0.12] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-white/70 hover:text-white transition-all mr-1 shrink-0"
              title="Back to Home"
            >
              <ArrowLeft size={16} />
            </Link>
            <BookOpen className="text-cyan-400 shrink-0" size={22} />
            <div>
              <h1 className="text-base sm:text-2xl font-cinzel font-bold text-white tracking-wider uppercase">
                E-Souvenir 2026
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-[11px] font-mono text-cyan-200/60">
                  {"OFFICIAL DIGITAL EDITION // FLIPHTML5"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official FlipHTML5 Embedded Flippable Book (Mobile & Desktop Responsive) */}
        <FlipHTML5Embed />
      </div>
    </div>
  );
}
