"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink, Download, Sparkles, ArrowRight } from "lucide-react";

export const SouvenirBanner: React.FC = () => {
  return (
    <section className="relative w-full py-10 md:py-20 overflow-hidden bg-transparent z-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#030718]/90 via-[#07132e]/85 to-[#020512]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(56,189,248,0.12)]"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Column: Badge, Title, Subtitle, and CTAs */}
            <div className="flex-1 text-center lg:text-left w-full">
              {/* Announcement Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-300 mb-3 sm:mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Sparkles size={12} className="text-cyan-400 animate-spin shrink-0" style={{ animationDuration: "8s" }} />
                <span>{"OFFICIAL SOUVENIR // 2026 EDITION"}</span>
              </div>

              {/* Main Headline requested by user */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold uppercase tracking-wider text-white mb-3 sm:mb-4 leading-tight">
                Souvenir is Out! <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white text-glow">Check It Out</span>
              </h2>

              <p className="text-xs sm:text-base text-cyan-100/70 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed mb-6 sm:mb-8">
                The official Sathsara Dahana 2026 Sponsorship Souvenir is now live. Discover our musical vision, cultural legacy, and partnership opportunities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                {/* Primary Button: Check it out */}
                <Link
                  href="/souvenir"
                  className="group relative px-6 py-3.5 sm:px-9 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 text-black font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-center"
                >
                  <BookOpen size={16} />
                  <span>Check It Out</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button: Open in New Tab */}
                <a
                  href="/souvenir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/15 hover:border-cyan-400/50 hover:bg-white/10 text-white font-cinzel font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  title="Open in new tab"
                >
                  <ExternalLink size={15} />
                  <span>Open in New Tab</span>
                </a>

                {/* Download PDF button */}
                <a
                  href="/Sathsara Daehana 2026 - Sponsorship Souvenir (English).pdf"
                  download="Sathsara_Dahana_2026_Souvenir.pdf"
                  className="px-4 py-3 rounded-xl text-white/50 hover:text-cyan-300 hover:bg-white/5 transition-all text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  title="Download PDF directly"
                >
                  <Download size={14} />
                  <span>PDF (595 KB)</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Floating Book Preview with Realistic Perspective */}
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
              className="relative w-40 sm:w-52 md:w-60 aspect-[1192/1686] shrink-0 cursor-pointer"
            >
              <Link href="/souvenir" className="block relative w-full h-full">
                {/* Glowing Backlight */}
                <div className="absolute inset-0 bg-cyan-400/30 rounded-xl blur-2xl transform -rotate-2 scale-95 pointer-events-none" />

                {/* 3D Book Cover Card */}
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#070b14] group">
                  <Image
                    src="/souvenir/page-1.jpg"
                    alt="Sathsara Dahana 2026 Souvenir Cover"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 640px) 240px, 160px"
                  />

                  {/* Corner Ribbon / Glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 right-2 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-cyan-400 text-black text-[9px] sm:text-[10px] font-cinzel font-bold tracking-wider uppercase shadow-md">
                      Click to Flip
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
