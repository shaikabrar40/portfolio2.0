import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Clapperboard, Instagram } from 'lucide-react';
import type { SiteSettings } from '../lib/api';
import VideoBackground from './VideoBackground';

interface HeroProps {
  settings: SiteSettings;
  projectCount: number | null;
  projectsLoading: boolean;
  onOpenSettings: () => void;
}

export default function Hero({ settings, projectCount, projectsLoading, onOpenSettings }: HeroProps) {
  const stats = [
    { value: 'CS', label: 'Undergraduate @ MITS' },
    { value: projectsLoading ? '…' : `${projectCount ?? 6}+`, label: 'Projects in the pipeline' },
    { value: '1', label: 'Coding page @aura.codes_' },
    { value: '∞', label: 'Curiosity' },
  ];

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      <VideoBackground
        videoUrl={settings.hero_video_url}
        posterUrl={settings.hero_poster_url}
        overlayOpacity={settings.overlay_opacity}
        enabled={settings.video_enabled}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-32 text-center sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to collaborations
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-lg font-medium text-white/80 sm:text-xl"
        >
          Hello, I&apos;m
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-1 text-6xl font-black tracking-tight text-white sm:text-8xl"
        >
          Abrar<span className="bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26 }}
          className="mt-4 text-xl font-bold text-white sm:text-2xl"
        >
          CS Student <span className="text-white/50">&amp;</span>{' '}
          <span className="bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Aspiring Developer
          </span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          I&apos;m a Computer Science student at MITS who loves turning ideas into clean, colourful web apps.
          Currently learning by building — and sharing the journey on Instagram at @aura.codes_.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-2xl transition hover:scale-105 active:scale-95"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://instagram.com/aura.codes_"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            <Instagram className="h-4 w-4" />
            Follow @aura.codes_
          </a>
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/30 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
          >
            <Clapperboard className="h-4 w-4" />
            Change video
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md"
            >
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        title="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70 transition hover:text-white"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  );
}
