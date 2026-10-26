// Web Audio API Synthesizer for Time Portal Cinematic Experience
// Pure procedural synthesis - no external audio files required, zero load latency.

class PortalAudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portal_audio_muted");
      this.isMuted = stored === "true";
    }
  }

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portal_audio_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      this.stopAmbientHum();
    } else {
      this.startAmbientHum();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /** Subtle cosmic low-frequency ambient hum for Phase A */
  public startAmbientHum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.humOsc) return; // already playing

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft dual-frequency tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.humOsc = osc;
      this.humGain = gain;
    } catch {
      // Audio autoplay policy or failure - safe fail
    }
  }

  public stopAmbientHum() {
    if (!this.humOsc || !this.ctx || !this.humGain) return;
    try {
      const now = this.ctx.currentTime;
      this.humGain.gain.setValueAtTime(this.humGain.gain.value, now);
      this.humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        if (this.humOsc) {
          try {
            this.humOsc.stop();
            this.humOsc.disconnect();
          } catch {}
          this.humOsc = null;
          this.humGain = null;
        }
      }, 900);
    } catch {
      this.humOsc = null;
      this.humGain = null;
    }
  }

  /** Option select chime */
  public playSelectSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  /** Step forward / confirm chime */
  public playStepSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.08, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.4);
      });
    } catch {}
  }

  /** Portal activation / birth chime */
  public playPortalOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392.0, 493.88, 523.25].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.8);
      });
    } catch {}
  }

  /** Phase B: Cinematic Expansion acceleration whoosh & sub-drop */
  public playPortalExpansion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Heavy sub-bass buildup
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sawtooth";
      subOsc.frequency.setValueAtTime(40, now);
      subOsc.frequency.exponentialRampToValueAtTime(160, now + 1.8);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 1.8);

      subGain.gain.setValueAtTime(0.05, now);
      subGain.gain.linearRampToValueAtTime(0.25, now + 1.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 2.6);

      // 2. High-energy dimensional warp riser
      const riseOsc = this.ctx.createOscillator();
      const riseGain = this.ctx.createGain();
      riseOsc.type = "sine";
      riseOsc.frequency.setValueAtTime(220, now + 0.2);
      riseOsc.frequency.exponentialRampToValueAtTime(1400, now + 2.2);

      riseGain.gain.setValueAtTime(0.02, now + 0.2);
      riseGain.gain.linearRampToValueAtTime(0.18, now + 2.0);
      riseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      riseOsc.connect(riseGain);
      riseGain.connect(this.ctx.destination);

      riseOsc.start(now + 0.2);
      riseOsc.stop(now + 2.5);

      // 3. Peak flash / celestial burst
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const flashNow = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq) => {
          if (!this.ctx) return;
          const chordOsc = this.ctx.createOscillator();
          const chordGain = this.ctx.createGain();
          chordOsc.type = "sine";
          chordOsc.frequency.setValueAtTime(freq, flashNow);

          chordGain.gain.setValueAtTime(0.1, flashNow);
          chordGain.gain.exponentialRampToValueAtTime(0.001, flashNow + 1.8);

          chordOsc.connect(chordGain);
          chordGain.connect(this.ctx.destination);

          chordOsc.start(flashNow);
          chordOsc.stop(flashNow + 1.8);
        });
      }, 2100);
    } catch {}
  }
}

export const portalAudio = new PortalAudioController();
