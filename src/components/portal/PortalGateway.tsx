"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortalCanvas } from "./PortalCanvas";
import { portalAudio } from "@/src/lib/portalAudio";

interface PortalGatewayProps {
  isTriggered: boolean;
  onTransitionComplete?: () => void;
  isCompletedChallenge: boolean;
  size?: number; // base diameter in px (e.g. 260)
}

export const PortalGateway: React.FC<PortalGatewayProps> = ({
  isTriggered,
  onTransitionComplete,
  isCompletedChallenge,
  size = 260,
}) => {
  const reduceMotion = useReducedMotion();
  const [animStage, setAnimStage] = useState<"hidden" | "opening" | "idle" | "charging" | "expanding" | "flash" | "done">("hidden");
  const [openProgress, setOpenProgress] = useState(0); // 0 to 1 when portal opens small
  const [expansionProgress, setExpansionProgress] = useState(0); // 0 to 1 when portal expands across screen

  // 1. Birth/Open animation: When challenge is completed, portal opens from a tiny spark to small circular portal
  useEffect(() => {
    if (!isCompletedChallenge) {
      setAnimStage("hidden");
      return;
    }

    if (animStage === "hidden") {
      setAnimStage("opening");
      portalAudio.playPortalOpen();
      portalAudio.startAmbientHum();

      const startTime = performance.now();
      const OPEN_DURATION = 800; // ms

      const stepOpen = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / OPEN_DURATION);
        // Spring-like overshoot ease
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setOpenProgress(eased);

        if (p < 1) {
          requestAnimationFrame(stepOpen);
        } else {
          setOpenProgress(1);
          setAnimStage("idle");
        }
      };

      requestAnimationFrame(stepOpen);
    }
  }, [isCompletedChallenge, animStage]);

  // 2. Trigger choreographed Phase B expansion: From small portal to large across the entire screen
  useEffect(() => {
    if (!isTriggered || (animStage !== "idle" && animStage !== "opening")) return;

    setAnimStage("charging");
    portalAudio.playPortalExpansion();

    // Charging phase (0 - 500ms): Core contracts slightly and superheats
    const chargeTimer = setTimeout(() => {
      setAnimStage("expanding");

      const startTime = performance.now();
      const EXPAND_DURATION = reduceMotion ? 1200 : 2000;

      const stepExpand = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / EXPAND_DURATION);
        // Exponential ease-in to simulate smooth continuous acceleration from small to filling the whole screen
        const eased = Math.pow(rawProgress, 2.5);
        setExpansionProgress(eased);

        if (rawProgress < 1) {
          requestAnimationFrame(stepExpand);
        } else {
          setAnimStage("flash");
          setTimeout(() => {
            setAnimStage("done");
            if (onTransitionComplete) {
              onTransitionComplete();
            }
          }, 450);
        }
      };

      requestAnimationFrame(stepExpand);
    }, 500);

    return () => clearTimeout(chargeTimer);
  }, [isTriggered, animStage, onTransitionComplete, reduceMotion]);

  // Stop audio on completion
  useEffect(() => {
    return () => {
      portalAudio.stopAmbientHum();
    };
  }, []);

  // Compute live portal scale:
  // - hidden: 0
  // - opening: 0 -> 1 (opens small at center)
  // - idle: 1 (small portal, 260px wide)
  // - charging: 0.92 (subtle contraction)
  // - expanding: 1 -> 52 (continuous expansion filling the entire screen)
  // - flash / done: 60+ (fully engulfing the screen)
  const getScale = () => {
    if (animStage === "hidden") return 0;

    if (animStage === "opening") {
      return openProgress;
    }

    if (reduceMotion) {
      if (animStage === "charging") return 0.95;
      if (animStage === "expanding") return 1 + expansionProgress * 3;
      if (animStage === "flash" || animStage === "done") return 5;
      return 1;
    }

    if (animStage === "idle") return 1;
    if (animStage === "charging") return 0.92;
    if (animStage === "expanding") {
      // From 1 (small 260px) to 52 (over 13,500px, completely engulfing the screen)
      return 1 + expansionProgress * 52;
    }
    if (animStage === "flash" || animStage === "done") return 60;
    return 1;
  };

  const currentScale = getScale();
  const isExpandingStage = animStage === "expanding" || animStage === "charging";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none transition-opacity duration-500 ${
        animStage === "hidden" ? "opacity-0" : "opacity-100"
      } ${isExpandingStage || animStage === "flash" ? "z-50" : "z-10"}`}
    >
      {/* Background Canvas for swirling vortex and hyperdrive warp streaks */}
      <PortalCanvas
        isExpanding={isExpandingStage}
        expansionProgress={expansionProgress}
      />

      {/* Atmospheric Fog Nebulae */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Deep blue atmospheric aura */}
        <motion.div
          animate={{
            scale: isExpandingStage ? [1, 2.5] : [0.95, 1.08, 0.95],
            opacity: isExpandingStage ? [0.6, 1] : [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: isExpandingStage ? 1.5 : 5,
            repeat: isExpandingStage ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-blue-600/20 blur-[120px]"
        />

        {/* Electric cyan core aura */}
        <motion.div
          animate={{
            scale: isExpandingStage ? [1, 3] : [1, 1.15, 1],
            opacity: isExpandingStage ? [0.7, 1] : [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: isExpandingStage ? 1.5 : 3.5,
            repeat: isExpandingStage ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-cyan-400/25 blur-[80px]"
        />
      </div>

      {/* Main Dimensional Portal (Phase A & B Gateway) */}
      <div
        style={{
          width: size,
          height: size,
          transform: `scale(${currentScale})`,
          transition: animStage === "charging" ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
        className="relative flex items-center justify-center will-change-transform"
      >
        {/* Layer 1: Outer Runic & Glyph Ring - Slow Clockwise */}
        <motion.svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: isExpandingStage ? 3.5 : 42, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer circle boundary */}
          <circle cx="200" cy="200" r="190" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.45" />
          <circle cx="200" cy="200" r="182" fill="none" stroke="#0284c7" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="4 8" />

          {/* 72 Chrono-tick marks */}
          {Array.from({ length: 72 }).map((_, i) => {
            const isMajor = i % 6 === 0;
            const isMedium = i % 3 === 0;
            const tickLen = isMajor ? 14 : isMedium ? 8 : 4;
            return (
              <line
                key={i}
                x1="200"
                y1={200 - 190}
                x2="200"
                y2={200 - 190 + tickLen}
                stroke={isMajor ? "#e0f2fe" : "#38bdf8"}
                strokeWidth={isMajor ? 2 : 1}
                strokeOpacity={isMajor ? 0.9 : 0.4}
                transform={`rotate(${i * 5} 200 200)`}
              />
            );
          })}

          {/* 8 Dimensional anchor nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 200 200)`}>
              <circle cx="200" cy="18" r="3.5" fill="#38bdf8" />
              <circle cx="200" cy="18" r="7" fill="none" stroke="#67e8f9" strokeWidth="1" strokeOpacity="0.8" />
            </g>
          ))}
        </motion.svg>

        {/* Layer 2: Swirling Accretion Disk Ring - Counter-Clockwise */}
        <motion.svg
          viewBox="0 0 400 400"
          className="absolute inset-[6%] w-[88%] h-[88%] overflow-visible pointer-events-none"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: isExpandingStage ? 2 : 22, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="portalAccretionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="url(#portalAccretionGrad)"
            strokeWidth="3.5"
            strokeDasharray="28 14 6 14"
            style={{ filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.7))" }}
          />
          <circle
            cx="200"
            cy="200"
            r="145"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="10 20"
          />
        </motion.svg>

        {/* Layer 3: High-Frequency Plasma Arc Ring - Fast Clockwise */}
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: isExpandingStage ? 1 : 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[14%] rounded-full border-2 border-dashed border-cyan-300/60 pointer-events-none"
          style={{
            boxShadow: "0 0 25px rgba(34, 211, 238, 0.5), inset 0 0 25px rgba(34, 211, 238, 0.4)",
          }}
        />

        {/* Layer 4: Event Horizon Luminous Rim */}
        <motion.div
          animate={{
            boxShadow: isExpandingStage
              ? [
                  "0 0 50px rgba(56, 189, 248, 0.9), inset 0 0 40px rgba(224, 242, 254, 0.9)",
                  "0 0 120px rgba(255, 255, 255, 1), inset 0 0 90px rgba(56, 189, 248, 1)",
                ]
              : [
                  "0 0 35px rgba(56, 189, 248, 0.7), inset 0 0 30px rgba(56, 189, 248, 0.6)",
                  "0 0 60px rgba(56, 189, 248, 0.95), inset 0 0 45px rgba(125, 211, 252, 0.8)",
                  "0 0 35px rgba(56, 189, 248, 0.7), inset 0 0 30px rgba(56, 189, 248, 0.6)",
                ],
          }}
          transition={{
            duration: isExpandingStage ? 0.9 : 2.5,
            repeat: isExpandingStage ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-[20%] rounded-full border-[3px] border-white/90 pointer-events-none bg-transparent"
        />

        {/* Layer 5: The Singularity Deep Core (Vortex Void with Internal Depth) */}
        <div
          className="relative w-[56%] h-[56%] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, #00030a 0%, #02071a 50%, #031b3b 85%, #38bdf8 100%)",
            boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.95), inset 0 0 15px rgba(56, 189, 248, 0.8)",
          }}
        >
          {/* Deep core cosmic swirl */}
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360, scale: [0.85, 1.15, 0.85] }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-full h-full rounded-full opacity-75"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(56, 189, 248, 0.65) 90deg, transparent 180deg, rgba(14, 165, 233, 0.75) 270deg, transparent 360deg)",
              filter: "blur(4px)",
            }}
          />

          {/* Central event horizon eye */}
          <motion.div
            animate={{
              scale: isExpandingStage ? [1, 0.3, 3] : [0.9, 1.1, 0.9],
              opacity: isExpandingStage ? [1, 0.2, 1] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: isExpandingStage ? 1.5 : 3,
              repeat: isExpandingStage ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-8 h-8 rounded-full bg-cyan-200 blur-[2px]"
            style={{
              boxShadow: "0 0 20px #e0f2fe, 0 0 40px #38bdf8",
            }}
          />
        </div>
      </div>

      {/* Phase B: Blinding White/Cyan Peak Transition Flash */}
      {animStage === "flash" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.95] }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-gradient-to-t from-cyan-100 via-white to-sky-100 pointer-events-none"
        />
      )}
    </div>
  );
};
