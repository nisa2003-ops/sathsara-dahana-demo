"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PORTAL_QUESTIONS, PortalQuestion } from "@/src/data/portalQuestions";
import { portalAudio } from "@/src/lib/portalAudio";

interface PortalChallengeProps {
  onChallengeCompleted: () => void;
}

export const PortalChallenge: React.FC<PortalChallengeProps> = ({
  onChallengeCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentQ: PortalQuestion = PORTAL_QUESTIONS[currentIndex];
  const currentSelection = selectedAnswers[currentQ.id];
  const totalQuestions = PORTAL_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + (currentSelection ? 1 : 0)) / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
    portalAudio.playSelectSound();
  };

  const handleNext = () => {
    if (!currentSelection) return;

    portalAudio.playStepSound();

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onChallengeCompleted();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-2 sm:px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl bg-[#020617]/90 border border-white/10 p-4 sm:p-7 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(56,189,248,0.08)] transform-gpu"
        >
          {/* Header: Sector & Question Number */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-300 truncate max-w-[170px] sm:max-w-none">
                {currentQ.category}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-cinzel text-[11px] sm:text-sm font-semibold tracking-widest text-white/90">
                SEQ {currentQ.questionNumber}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-6 sm:mb-8">
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-white/50 mb-2">
              <span>TEMPORAL CALIBRATION</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
              {PORTAL_QUESTIONS.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isCurrent = idx === currentIndex;
                return (
                  <div
                    key={q.id}
                    className={`flex-1 h-full mx-[1px] transition-all duration-500 rounded-full ${
                      isAnswered
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                        : isCurrent
                        ? "bg-cyan-500/40 animate-pulse"
                        : "bg-white/5"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Question Title & Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-xl md:text-2xl font-cinzel font-semibold text-white/95 leading-relaxed tracking-wide mb-2">
              {currentQ.title}
            </h3>
            {currentQ.description && (
              <p className="text-xs sm:text-sm text-cyan-100/50 font-mono">
                {currentQ.description}
              </p>
            )}
          </div>

          {/* Options List */}
          <div
            className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8"
            role="radiogroup"
            aria-label={`Question ${currentQ.questionNumber}`}
          >
            {currentQ.options.map((opt) => {
              const isSelected = currentSelection === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  role="radio"
                  aria-checked={isSelected}
                  className={`w-full group text-left p-3.5 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? "bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_24px_rgba(56,189,248,0.25)] translate-x-1"
                      : "bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-2">
                    {/* Letter Indicator badge */}
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs sm:text-sm font-semibold shrink-0 transition-all duration-300 ${
                        isSelected
                          ? "bg-cyan-400 text-black shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                          : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span
                      className={`text-xs sm:text-base font-sans tracking-wide transition-colors leading-snug ${
                        isSelected ? "text-white font-medium" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-400/20"
                        : "border-white/20 group-hover:border-white/40"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
            <span className="text-[11px] font-mono text-white/40 text-center sm:text-left">
              {currentSelection ? "VECTOR LOCKED" : "SELECT OPTION TO CONTINUE"}
            </span>

            <button
              onClick={handleNext}
              disabled={!currentSelection}
              className={`w-full sm:w-auto relative px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-3 transition-all duration-400 ${
                currentSelection
                  ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-black shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] hover:scale-[1.02] cursor-pointer"
                  : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <span>{currentIndex < totalQuestions - 1 ? "Next Vector" : "Harmonize Core"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
