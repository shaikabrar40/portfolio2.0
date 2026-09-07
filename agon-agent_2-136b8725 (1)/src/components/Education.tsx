import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Loader2 } from 'lucide-react';
import type { EducationItem } from '../lib/api';

interface EducationProps {
  items: EducationItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function Education({ items, loading, error, onRetry }: EducationProps) {
  return (
    <section id="education" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-[#0d0d20] sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-500">Education</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Where I&apos;m learning
          </h2>
        </motion.div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading education...
          </div>
        ) : error ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl bg-rose-500/10 p-6 text-center text-sm text-rose-500">
            Couldn&apos;t load education: {error}{' '}
            <button onClick={onRetry} className="ml-1 font-bold underline">Try again</button>
          </div>
        ) : (
          <div className="relative mt-12 space-y-6 before:absolute before:bottom-4 before:left-[27px] before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-pink-500 before:via-violet-500 before:to-cyan-400">
            {items.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.25) }}
                className="relative flex gap-5"
              >
                <span className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/25">
                  {i === 0 ? <GraduationCap className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
                </span>
                <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm dark:bg-white/5 dark:shadow-none">
                  <div className="flex flex-wrap items-center gap-2">
                    {e.period && (
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-500">
                        {e.period}
                      </span>
                    )}
                    {e.status && (
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
                        {e.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-black text-slate-900 dark:text-white">{e.title}</h3>
                  {e.school && <p className="text-sm font-bold text-violet-500">{e.school}</p>}
                  {e.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{e.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
