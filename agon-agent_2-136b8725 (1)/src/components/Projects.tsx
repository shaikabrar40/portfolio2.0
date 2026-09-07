import { motion } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '../lib/api';

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function Projects({ projects, loading, error, onRetry }: ProjectsProps) {
  return (
    <section id="projects" className="scroll-mt-20 bg-white py-20 dark:bg-[#0a0a18] sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-500">Projects</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            What I&apos;ve built
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
            Small, practical apps — each one taught me something new.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-900/5 dark:bg-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl bg-rose-500/10 p-6 text-center text-sm text-rose-500">
            Couldn&apos;t load projects: {error}{' '}
            <button onClick={onRetry} className="ml-1 font-bold underline">Try again</button>
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-12 text-center text-slate-500">No projects yet — check back soon.</p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="group flex flex-col rounded-3xl border border-slate-900/10 bg-slate-50 p-6 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-500/15 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-2xl shadow-lg shadow-violet-500/25">
                    {p.icon || '✨'}
                  </span>
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {p.description}
                </p>
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex gap-2">
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:scale-[1.03] dark:bg-white dark:text-slate-900"
                    >
                      Live
                    </a>
                  )}
                  {p.code_url && (
                    <a
                      href={p.code_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-900/15 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-900/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      <Code2 className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
