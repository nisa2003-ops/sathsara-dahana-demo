import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, BookOpen } from "lucide-react";
import VortexBackground from "@/src/components/ui/VortexBackground";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sponsorship Souvenir 2026 | Sathsara Dahana",
  description: "Browse the official Sathsara Dahana 2026 Sponsorship Souvenir on FlipHTML5.",
  openGraph: {
    title: "Sathsara Dahana 2026 — Sponsorship Souvenir",
    description: "Browse our official event souvenir online.",
  },
};

export default function SouvenirPage() {
  return (
    <div className="relative min-h-screen bg-[#02040d] text-white pt-24 pb-16 sm:pt-36 sm:pb-24 px-3 sm:px-6 overflow-hidden flex flex-col justify-between">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
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
                Sponsorship Souvenir 2026
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-[11px] font-mono text-cyan-200/60">
                  {"OFFICIAL DIGITAL EDITION // FLIPHTML5"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
            <a
              href="https://online.fliphtml5.com/otefy/woan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 text-xs font-cinzel tracking-wider text-white/80 hover:text-white transition-all cursor-pointer"
              title="Open directly in FlipHTML5"
            >
              <ExternalLink size={14} className="text-cyan-400" />
              <span>Full Screen</span>
            </a>

            <a
              href="/Sathsara Daehana 2026 - Sponsorship Souvenir (English).pdf"
              download="Sathsara_Dahana_2026_Souvenir.pdf"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-semibold hover:brightness-110 text-xs font-cinzel tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              title="Download Original PDF"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Official FlipHTML5 Embedded Flippable Book (Default Viewer) */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div style={{ position: "relative", paddingTop: "max(60%, 324px)", width: "100%", height: 0 }}>
            <iframe
              style={{
                position: "absolute",
                border: "none",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
              }}
              src="https://online.fliphtml5.com/otefy/woan/"
              title="Sathsara Daehana 2026 - Sponsorship Souvenir (English)"
              seamless
              scrolling="no"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
