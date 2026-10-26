"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  // Scroll Spy and Navbar Background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sections = ["introduction", "timeline"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "ABOUT", href: "/#introduction", id: "introduction" },
    { name: "TIMELINE", href: "/#timeline", id: "timeline" },
    { name: "RESULTS", href: "/results", id: "results" },
    { name: "SOUVENIR", href: "/souvenir", id: "souvenir" },
    { name: "TIME PORTAL", href: "/portal", id: "portal" },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] 
    w-[92%] md:w-[98%] max-w-6xl
    px-6 md:px-10 py-4
    flex justify-between items-center 
    rounded-full transition-all duration-700 ease-[0.16,1,0.3,1]
    ${scrolled ? "bg-black/40 border-white/20 py-3" : "bg-white/5 border-white/10"}
    backdrop-blur-2xl
    border transform-gpu
    shadow-[0_0_40px_rgba(59,130,246,0.12)]`}
      >
        {/* Left Logo */}
        <motion.div
          className="text-white text-lg md:text-xl font-cinzel tracking-widest cursor-pointer transform-gpu"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Link href="/">
            Sathsara <span className="text-blue-400">Dahana</span>
          </Link>
        </motion.div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex gap-7 xl:gap-9 text-[11px] uppercase tracking-[0.3em] font-cinzel items-center">
          {navLinks.map((link) => {
            const isPortal = link.id === "portal";
            const isSouvenir = link.id === "souvenir";
            const isActive =
              (isPortal && pathname.startsWith("/portal")) ||
              (isSouvenir && pathname === "/souvenir") ||
              (link.id === "results" && pathname === "/results") ||
              activeSection === link.id;

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-all duration-500 ease-[0.16,1,0.3,1] relative group flex items-center gap-1.5 ${
                  isActive
                    ? isPortal
                      ? "text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                      : isSouvenir
                      ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      : "text-blue-400"
                    : isPortal
                    ? "text-cyan-200/90 hover:text-white"
                    : isSouvenir
                    ? "text-white/80 hover:text-cyan-300"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {isPortal && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                )}
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] ${
                    isPortal ? "bg-cyan-400" : isSouvenir ? "bg-cyan-400" : "bg-blue-400"
                  } transition-all duration-500 ease-[0.16,1,0.3,1] ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Glow Accent / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div
            className="hidden md:block w-10 h-10 rounded-full 
      bg-blue-500/20 blur-md animate-pulse transform-gpu"
          />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-500 ease-[0.16,1,0.3,1]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#02040d]/95 lg:hidden flex flex-col items-center justify-center transform-gpu overflow-y-auto py-12 px-6"
          >
            <div className="flex flex-col gap-7 text-center">
              {navLinks.map((link, i) => {
                const isPortal = link.id === "portal";
                const isSouvenir = link.id === "souvenir";
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`text-2xl font-cinzel tracking-[0.3em] transition-colors duration-500 py-2 flex items-center justify-center gap-2 ${
                        isPortal
                          ? "text-cyan-300 drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]"
                          : isSouvenir
                          ? "text-cyan-300"
                          : "text-white/80 hover:text-blue-400"
                      }`}
                    >
                      {isPortal && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative background element for mobile menu */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
