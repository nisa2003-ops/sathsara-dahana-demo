"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, Sparkles, ShieldCheck } from "lucide-react";
import { PortalGateway } from "./PortalGateway";
import { PortalChallenge } from "./PortalChallenge";
import { portalAudio } from "@/src/lib/portalAudio";

export const TimePortalExperience: React.FC = () => {
  const router = useRouter();
  const [hasCompletedChallenge, setHasCompletedChallenge] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSound = () => {
    const nextMuted = portalAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleChallengeCompleted = () => {
    setHasCompletedChallenge(true);
  };

  const handleEnterPortal = () => {
    if (isExpanding) return;
    setIsExpanding(true);
  };

  const handleTransitionComplete = () => {
    // Navigate to the full-screen dimension destination route
    router.push("/portal/dimension");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#02040d] text-white overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
      {/* Top Header */}
      <header
        className={`relative z-40 w-full px-4 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md transition-opacity duration-500 ${
          isExpanding ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 text-white/70 hover:text-cyan-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors shrink-0">
            <ArrowLeft size={16} />
          </div>
          <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            CODEXIA <span className="text-cyan-400 hidden xs:inline">{"// EXIT TO MAIN SITE"}</span>
          </span>
        </Link>

        {/* Audio control & Portal status pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {hasCompletedChallenge ? "PORTAL: UNLOCKED" : "PORTAL: CALIBRATING"}
          </div>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute portal audio" : "Mute portal audio"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-300 hover:border-cyan-400/50 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </header>

      {/* Center Cinematic Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 py-6 md:py-12">
        {/* The Portal Gateway: Opens small at center, then expands large across the screen */}
        <PortalGateway
          isTriggered={isExpanding}
          isCompletedChallenge={hasCompletedChallenge}
          onTransitionComplete={handleTransitionComplete}
          size={isMobile ? 210 : 260}
        />

        {/* Stage Content: Switch between Challenge and Portal Controls */}
        <div className="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!hasCompletedChallenge ? (
              /* Phase 1: 3-Question Challenge */
              <motion.div
                key="challenge-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-6 sm:mb-8 px-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-[9px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-300 mb-2.5">
                    <Sparkles size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
                    <span>DIMENSIONAL PROTOCOL</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold uppercase tracking-wider text-white text-glow mb-2">
                    Time Portal Challenge
                  </h1>
                  <p className="text-xs sm:text-sm text-cyan-100/60 font-sans max-w-md mx-auto">
                    Calibrate 3 temporal vectors to stabilize the event horizon and open the gateway into the next dimension.
                  </p>
                </div>

                <PortalChallenge onChallengeCompleted={handleChallengeCompleted} />
              </motion.div>
            ) : (
              /* Phase 2: Portal Opened (Small at Center), Ready to Expand */
              <motion.div
                key="portal-ready-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isExpanding ? 0 : 1, y: isExpanding ? 20 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center text-center mt-[170px] sm:mt-[230px] pointer-events-auto px-4"
              >
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>TEMPORAL HARMONICS LOCKED</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-cinzel font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300 mb-2 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                  Gateway Stabilized
                </h2>

                <p className="text-[11px] sm:text-sm text-cyan-100/70 max-w-sm sm:max-w-md mx-auto mb-5 sm:mb-6 font-sans">
                  The dimensional rift is open. Tap below to initiate hyperdrive traversal across spacetime.
                </p>

                {/* Prominent ENTER THE PORTAL Button */}
                <motion.button
                  onClick={handleEnterPortal}
                  disabled={isExpanding}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto group relative px-8 py-4 sm:px-14 sm:py-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 text-black font-cinzel font-extrabold text-xs sm:text-base tracking-[0.25em] sm:tracking-[0.35em] uppercase shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:shadow-[0_0_80px_rgba(56,189,248,0.95)] transition-all duration-300 cursor-pointer overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
                >
                  {/* Glowing light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-[0.16,1,0.3,1]" />

                  <span className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3">
                    <Sparkles size={18} className="animate-spin text-black shrink-0" style={{ animationDuration: "6s" }} />
                    ENTER THE PORTAL
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer bar */}
      <footer
        className={`relative z-40 w-full px-4 py-3 md:px-12 md:py-4 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-white/40 transition-opacity duration-500 ${
          isExpanding ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div>{"SATHSARA DAHANA 2026 // TIME PORTAL"}</div>
        <div className="mt-1 sm:mt-0">{"FACULTY OF APPLIED SCIENCES // USJ"}</div>
      </footer>
    </div>
  );
};
