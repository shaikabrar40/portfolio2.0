import { motion } from 'framer-motion';
import { GraduationCap, Instagram, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 dark:bg-[#0a0a18] sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-500">About me</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            A little background
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-slate-900/[0.04] p-8 leading-relaxed text-slate-600 dark:bg-white/5 dark:text-slate-300 lg:col-span-2"
          >
            <p>
              I&apos;m <strong className="text-slate-900 dark:text-white">Abrar</strong>, a Computer Science student
              at MITS (Deemed to be University). I got hooked on programming the first time I made a webpage
              change colour with a single line of code — and I&apos;ve been chasing that feeling ever since.
            </p>
            <p className="mt-4">
              Right now I&apos;m focused on strengthening my fundamentals in programming and web development, and
              building small, practical projects to apply what I learn. I believe the best way to learn is to
              build, break things, and fix them.
            </p>
            <p className="mt-4">
              Outside the classroom, I run <strong className="text-slate-900 dark:text-white">@aura.codes_</strong> on
              Instagram, where I share coding tips, project progress, and what I&apos;m learning. I&apos;m always open
              to collaborating with other students and beginners.
            </p>
            <a
              href="https://instagram.com/aura.codes_"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:scale-105 active:scale-95"
            >
              <Instagram className="h-4 w-4" />
              Follow the journey
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-1 items-center gap-4 rounded-3xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 p-6 text-white shadow-xl shadow-violet-500/25">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <div className="font-black">MITS</div>
                <div className="text-sm text-white/85">B.Tech - Computer Science</div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-3xl bg-slate-900 p-6 text-white dark:bg-white dark:text-slate-900">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 dark:bg-slate-900/10">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <div className="font-black">Learn in public</div>
                <div className="text-sm opacity-70">Tips and builds on Instagram</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
