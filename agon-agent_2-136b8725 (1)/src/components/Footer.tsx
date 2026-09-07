import { ArrowUp, Github, Instagram } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#07070f] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-sm font-black text-white">
            A
          </span>
          <span className="text-sm font-bold text-white">
            Abrar · aura<span className="text-violet-400">.codes_</span>
          </span>
        </div>
        <p className="text-xs text-white/50">© {year} Abrar · Built with React, Tailwind &amp; a cinematic video background</p>
        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/aura.codes_"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/shaikabrar40"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#top"
            title="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
