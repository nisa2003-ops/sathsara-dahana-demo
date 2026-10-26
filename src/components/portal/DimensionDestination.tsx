"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, ArrowLeft, RotateCcw, Volume2, VolumeX, Compass } from "lucide-react";
import { portalAudio } from "@/src/lib/portalAudio";

export const DimensionDestination: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMuted(portalAudio.getMuted());
    portalAudio.startAmbientHum();

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      portalAudio.stopAmbientHum();
    };
  }, []);

  const toggleSound = () => {
    const nextMuted = portalAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#010309] text-white overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
      {/* Background Dimensional Grid & Nebulae */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle perspective grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        {/* Ambient colored glowing clouds */}
        <div className="absolute top-1/4 left-1/3 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-cyan-600/15 blur-[120px] sm:blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-indigo-950/30 blur-[140px] sm:blur-[180px]" />
      </div>

      {/* Top Bar Navigation */}
      <header className="relative z-30 w-full px-4 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 text-white/70 hover:text-cyan-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors shrink-0">
            <ArrowLeft size={16} />
          </div>
          <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            SATHSARA DAHANA <span className="text-cyan-400 hidden xs:inline">{"// MAIN SITE"}</span>
          </span>
        </Link>

        {/* Sound toggle & Dimension Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-[10px] sm:text-[11px] font-mono text-cyan-300 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            0x7E2
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

      {/* Center Cinematic Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
        {/* Parallax Holographic Dimensional Artifact */}
        <motion.div
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          }}
          className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-6 sm:mb-8 will-change-transform flex items-center justify-center"
        >
          {/* Outer rotating gyro ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
            style={{ boxShadow: "0 0 30px rgba(56, 189, 248, 0.2)" }}
          />

          {/* Counter-rotating inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[15%] rounded-full border border-cyan-300/60"
            style={{
              boxShadow: "inset 0 0 20px rgba(56, 189, 248, 0.3), 0 0 20px rgba(56, 189, 248, 0.3)",
            }}
          />

          {/* Glowing Chrono-Core */}
          <motion.div
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-sky-200 flex items-center justify-center shadow-[0_0_60px_rgba(56,189,248,0.7)]"
          >
            <Compass size={32} className="text-black animate-spin" style={{ animationDuration: "16s" }} />
          </motion.div>
        </motion.div>

        {/* Cinematic Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-[10px] sm:text-sm font-mono tracking-[0.25em] sm:tracking-[0.4em] uppercase text-cyan-300">
              {"TRANSIT COMPLETE // CONTINUUM UNLOCKED"}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-cinzel font-black uppercase tracking-wider sm:tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-sky-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)] mb-4 sm:mb-6 leading-tight">
            YOU HAVE ENTERED ANOTHER DIMENSION
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-cyan-100/70 max-w-2xl mx-auto font-sans leading-relaxed mb-6 sm:mb-10 px-2">
            Welcome to the Sathsara Dahana Nexus. Here, time ceases to flow linearly; every rhythm, every cadence, and every visual frequency coexists in perpetual harmony.
          </p>

          {/* Telemetry Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto mb-8 sm:mb-12">
            {[
              { label: "COORDINATES", val: "NEXUS-07 // USJ" },
              { label: "ENTANGLEMENT", val: "LOCKED (100%)" },
              { label: "TIMELINE", val: "SEPTEMBER 2026" },
              { label: "RESONANCE", val: "HARMONIC" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left"
              >
                <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-cyan-400/80 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm font-cinzel font-semibold text-white/90 truncate">
                  {stat.val}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 text-black font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Globe size={16} className="group-hover:rotate-12 transition-transform" />
              <span>RETURN TO SATHSARA DAHANA</span>
            </Link>

            <Link
              href="/portal"
              className="w-full sm:w-auto px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl bg-white/5 border border-white/15 hover:border-cyan-400/50 hover:bg-white/10 text-white/80 hover:text-white font-cinzel font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>RE-ENTER PORTAL</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="relative z-30 w-full px-4 py-3 md:px-12 md:py-4 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-white/40">
        <div>{"SATHSARA DAHANA TEMPORAL ENGINE v2.4 // ALL RIGHTS RESERVED"}</div>
        <div className="mt-1 sm:mt-0">{"SECURE DIMENSIONAL TUNNEL // 0 LATENCY"}</div>
      </footer>
    </div>
  );
};
