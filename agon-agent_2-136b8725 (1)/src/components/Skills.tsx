import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { Skill } from '../lib/api';

interface SkillsProps {
  skills: Skill[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  language: 'Languages',
  web: 'Web',
  tool: 'Tools',
  concept: 'Concepts',
};

function barColor(level: number) {
  if (level >= 80) return 'from-emerald-400 to-cyan-400';
  if (level >= 60) return 'from-violet-500 to-cyan-400';
  if (level >= 40) return 'from-pink-500 to-violet-500';
  return 'from-amber-400 to-pink-500';
}

export default function Skills({ skills, loading, error, onRetry }: SkillsProps) {
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    const set = new Map<string, number>();
    skills.forEach((s) => {
      const c = (s.category || 'other').toLowerCase();
      set.set(c, (set.get(c) ?? 0) + 1);
    });
    return [...set.entries()];
  }, [skills]);

  const visible = filter === 'all' ? skills : skills.filter((s) => (s.category || '').toLowerCase() === filter);

  return (
    <section id="skills" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-[#0d0d20] sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-500">Skills</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Tools I&apos;m working with
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading skills...
          </div>
        ) : error ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl bg-rose-500/10 p-6 text-center text-sm text-rose-500">
            Couldn&apos;t load skills: {error}{' '}
            <button onClick={onRetry} className="ml-1 font-bold underline">Try again</button>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${filter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-300'
                  }`}
              >
                All ({skills.length})
              </button>
              {categories.map(([c, n]) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition ${filter === c
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-300'
                    }`}
                >
                  {CATEGORY_LABELS[c] ?? c} ({n})
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-violet-500">
                      {s.level ?? 50}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level ?? 50}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${barColor(s.level ?? 50)}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
