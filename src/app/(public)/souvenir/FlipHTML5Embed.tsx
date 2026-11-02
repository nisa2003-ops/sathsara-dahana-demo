"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Smartphone, BookOpen, Sparkles } from "lucide-react";

export default function FlipHTML5Embed() {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"auto" | "single" | "spread">("auto");

  useEffect(() => {
    const checkMobile = () => {
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isMobileWidth = window.innerWidth < 768;
      setIsMobileDevice(isMobileUA || isMobileWidth);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine effective mode:
  // If viewMode is 'auto', use 'single' on mobile, 'spread' on desktop.
  const isSinglePage =
    viewMode === "single" || (viewMode === "auto" && isMobileDevice);

  const iframeSrc = isSinglePage
    ? "https://online.fliphtml5.com/otefy/E-Souvenir/?phone=true"
    : "https://online.fliphtml5.com/otefy/E-Souvenir/";

  return (
    <div className="w-full flex flex-col items-center">
      {/* Mobile / Layout Controls & Status Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-3 px-1">
        {/* Current Mode Badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-200/80">
            {isSinglePage ? "Single Page View (Mobile Optimized)" : "2-Page Spread View"}
          </span>
        </div>

        {/* View Switcher & Fullscreen Action */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Manual Toggle between Single Page & 2-Page Spread */}
          <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-0.5 text-[11px] font-cinzel">
            <button
              type="button"
              onClick={() => setViewMode("single")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                isSinglePage
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              title="Switch to Single Page Mode (optimized for phones and small screens)"
            >
              <Smartphone size={13} />
              <span>1-Page</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("spread")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                !isSinglePage
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              title="Switch to 2-Page Spread Mode (desktop magazine reader)"
            >
              <BookOpen size={13} />
              <span>2-Page</span>
            </button>
          </div>

          {/* Full Screen Link */}
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 text-[11px] font-cinzel tracking-wider text-white/80 hover:text-white transition-all cursor-pointer"
            title="Open in new tab / full screen"
          >
            <ExternalLink size={12} className="text-cyan-400" />
            <span className="hidden sm:inline">Full Screen</span>
          </a>
        </div>
      </div>

      {/* Reader Container */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050914] shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 ${
          isSinglePage
            ? "h-[74vh] sm:h-[78vh] min-h-[520px] max-h-[780px] max-w-2xl mx-auto"
            : "h-[65vh] sm:h-[75vh] md:h-[80vh] min-h-[480px] sm:min-h-[580px] max-h-[860px]"
        }`}
      >
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title="Sathsara Dahana 2026 E-Souvenir"
          className="w-full h-full border-none absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          seamless
          scrolling="no"
          allow="fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
        />
      </div>

      {/* Mobile Swipe Tip */}
      <div className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-cyan-200/50 font-mono">
        <Sparkles size={13} className="text-cyan-400 shrink-0" />
        <span>
          {isSinglePage
            ? "Swipe left / right or tap page edges to turn pages"
            : "Click and drag page corners or use arrow keys to flip"}
        </span>
      </div>
    </div>
  );
}
