"use client";

import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface PortalCanvasProps {
  isExpanding?: boolean;
  expansionProgress?: number; // 0 to 1
  portalRadius?: number;
}

interface VortexParticle {
  angle: number;
  radius: number;
  angularSpeed: number;
  radialSpeed: number;
  size: number;
  hue: number; // around 190 (cyan) to 225 (electric blue)
  opacity: number;
  trailLength: number;
}

interface WarpStreak {
  angle: number;
  distance: number;
  length: number;
  speed: number;
  width: number;
  alpha: number;
}

export const PortalCanvas: React.FC<PortalCanvasProps> = ({
  isExpanding = false,
  expansionProgress = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const vortexParticles: VortexParticle[] = [];
    const warpStreaks: WarpStreak[] = [];
    const PARTICLE_COUNT = reduceMotion ? 40 : 160;
    const STREAK_COUNT = reduceMotion ? 10 : 80;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
    };

    const maxRadius = () => Math.sqrt(cx * cx + cy * cy) * 1.1;

    // Initialize swirling vortex particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      vortexParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * 500,
        angularSpeed: (0.004 + Math.random() * 0.012) * (Math.random() > 0.3 ? 1 : -1),
        radialSpeed: 0.4 + Math.random() * 1.2,
        size: 1 + Math.random() * 2.2,
        hue: 190 + Math.random() * 35, // Cyan (190) to Royal Blue (225)
        opacity: 0.3 + Math.random() * 0.7,
        trailLength: 2 + Math.random() * 6,
      });
    }

    // Initialize warp streaks
    for (let i = 0; i < STREAK_COUNT; i++) {
      warpStreaks.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 300,
        length: 20 + Math.random() * 80,
        speed: 12 + Math.random() * 25,
        width: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.8,
      });
    }

    window.addEventListener("resize", resize);
    resize();

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2.5);
      lastTime = time;

      // Dark cinematic backdrop trail
      if (isExpanding) {
        // Less clear to create motion blur during hyperdrive
        ctx.fillStyle = `rgba(2, 4, 13, ${Math.max(0.12, 0.3 - expansionProgress * 0.15)})`;
      } else {
        ctx.fillStyle = "rgba(2, 4, 13, 0.24)";
      }
      ctx.fillRect(0, 0, width, height);

      // 1. Swirling Inward Vortex Particles (Phase A & active during B)
      const speedMultiplier = isExpanding ? 1 + expansionProgress * 4 : 1;
      const currentMaxRad = maxRadius();

      vortexParticles.forEach((p) => {
        if (!reduceMotion) {
          p.angle += p.angularSpeed * dt * speedMultiplier;
          p.radius -= p.radialSpeed * dt * speedMultiplier;
        }

        // Rebirth once drawn into the portal center
        if (p.radius < 12) {
          p.radius = 200 + Math.random() * (currentMaxRad * 0.6);
          p.angle = Math.random() * Math.PI * 2;
        }

        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius;

        // Draw particle head
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.opacity * (p.radius / 300)})`;
        ctx.fill();

        // Draw curved orbital tail
        if (!reduceMotion && p.trailLength > 1) {
          const prevAngle = p.angle - p.angularSpeed * p.trailLength * dt;
          const prevRadius = p.radius + p.radialSpeed * p.trailLength * dt;
          const prevX = cx + Math.cos(prevAngle) * prevRadius;
          const prevY = cy + Math.sin(prevAngle) * prevRadius;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(prevX, prevY);
          ctx.strokeStyle = `hsla(${p.hue}, 90%, 65%, ${p.opacity * 0.4})`;
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        }
      });

      // 2. Warp Streaks (Activated strongly during Phase B expansion)
      if (isExpanding && !reduceMotion) {
        const streakFactor = Math.pow(expansionProgress, 1.4); // accelerates
        ctx.save();
        warpStreaks.forEach((st) => {
          st.distance += st.speed * dt * (1 + streakFactor * 6);
          st.length = (20 + streakFactor * 240) * (st.speed / 15);

          if (st.distance > currentMaxRad) {
            st.distance = Math.random() * 40;
            st.angle = Math.random() * Math.PI * 2;
          }

          const x1 = cx + Math.cos(st.angle) * st.distance;
          const y1 = cy + Math.sin(st.angle) * st.distance;
          const x2 = cx + Math.cos(st.angle) * (st.distance + st.length);
          const y2 = cy + Math.sin(st.angle) * (st.distance + st.length);

          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, "rgba(56, 189, 248, 0)");
          grad.addColorStop(0.5, `rgba(165, 243, 252, ${st.alpha * Math.min(1, streakFactor * 1.5)})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${st.alpha})`);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = grad;
          ctx.lineWidth = st.width * (1 + streakFactor * 2);
          ctx.stroke();
        });
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [isExpanding, expansionProgress, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
