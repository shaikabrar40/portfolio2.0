import { useEffect, useState } from 'react';
import { Clapperboard, Menu, Moon, Sun, X } from 'lucide-react';

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ dark, onToggleTheme, onOpenSettings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-[#0a0a18]/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-lg font-black text-white shadow-lg shadow-violet-500/30">
            A
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            aura<span className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">.codes_</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            title="Change background video"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:scale-105 active:scale-95 sm:inline-flex"
          >
            <Clapperboard className="h-4 w-4" />
            Background video
          </button>
          <button
            onClick={onToggleTheme}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-slate-700 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-amber-300 dark:hover:bg-white/20"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            title="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-slate-700 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-900/10 bg-white/95 px-4 pb-5 pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a18]/95 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenSettings();
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-4 py-3 text-sm font-bold text-white"
          >
            <Clapperboard className="h-4 w-4" />
            Background video
          </button>
        </div>
      )}
    </header>
  );
}
