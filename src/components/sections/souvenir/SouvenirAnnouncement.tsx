"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import styles from "./SouvenirAnnouncement.module.css";

// Survives client-side navigation, but resets on a full page refresh.
let souvenirAnnouncementShown = false;

export default function SouvenirAnnouncement() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const souvenirLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || souvenirAnnouncementShown) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let previousOverflow: string | undefined;

    const restoreScroll = () => {
      if (previousOverflow !== undefined) {
        document.body.style.overflow = previousOverflow;
        previousOverflow = undefined;
      }
    };

    const scheduleAnnouncement = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (souvenirAnnouncementShown || dialog.open || !dialog.isConnected) return;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        souvenirAnnouncementShown = true;
        souvenirLinkRef.current?.focus({ preventScroll: true });
      }, 450);
    };

    dialog.addEventListener("close", restoreScroll);
    window.addEventListener("sathsara:intro-complete", scheduleAnnouncement);

    // The intro may have finished before this component mounted.
    if (document.documentElement.dataset.introComplete === "true") {
      scheduleAnnouncement();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("sathsara:intro-complete", scheduleAnnouncement);
      dialog.removeEventListener("close", restoreScroll);
      dialog.close();
      restoreScroll();
    };
  }, []);

  const dismiss = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="souvenir-announcement-title"
      aria-describedby="souvenir-announcement-description"
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className={styles.card}>
        <div aria-hidden="true" className={styles.spotlights} />

        <button
          type="button"
          className={styles.close}
          onClick={dismiss}
          aria-label="Close souvenir announcement"
        >
          <X aria-hidden="true" size={18} />
        </button>

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> OFFICIAL SOUVENIR // 2026 EDITION
          </p>

          {/* 3D Floating Book Preview */}
          <div className={styles.bookPreviewWrapper}>
            <div className={styles.bookGlow} aria-hidden="true" />
            <div className={styles.bookCard}>
              <Image
                src="/souvenir/page-1.jpg"
                alt="Sathsara Dahana 2026 Sponsorship Souvenir Cover"
                fill
                sizes="104px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <p className={styles.kicker}>Digital Publication Live</p>

          <h2 id="souvenir-announcement-title" className={styles.title}>
            Souvenir<br />
            <span>is out!</span>
          </h2>

          <p id="souvenir-announcement-description" className={styles.description}>
            Explore the official Sathsara Dahana 2026 Sponsorship Souvenir. Discover our musical vision, cultural legacy, and partnership opportunities.
          </p>

          <ul className={styles.badges} aria-label="Souvenir features">
            <li>
              <Sparkles size={13} aria-hidden="true" /> Digital Edition
            </li>
          </ul>

          <Link
            ref={souvenirLinkRef}
            href="/souvenir"
            className={styles.cta}
            onClick={dismiss}
          >
            <span>Explore Souvenir</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>

          <button type="button" className={styles.later} onClick={dismiss}>
            I&apos;ll explore first
          </button>
        </div>

        <div className={styles.ticketFooter}>
          <span>Sathsara Dahana</span>
          <span>
            2026 <span aria-hidden="true">✦</span> Sponsorship Souvenir
          </span>
        </div>
      </div>
    </dialog>
  );
}
