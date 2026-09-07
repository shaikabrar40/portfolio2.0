import { useState } from 'react';
import { Check, Code2, Copy, Film, Image as ImageIcon, Link2, Loader2, Power, SlidersHorizontal, Upload, X } from 'lucide-react';
import type { SiteSettings } from '../lib/api';
import { VIDEO_PRESETS } from '../lib/api';

interface CustomizePanelProps {
  open: boolean;
  settings: SiteSettings;
  saving: boolean;
  uploading: boolean;
  onClose: () => void;
  onSave: (patch: Partial<SiteSettings>) => Promise<void>;
  onUpload: (file: File) => Promise<void>;
}

function buildSnippet(videoUrl: string) {
  return `<!-- Cinematic video background - paste right after <body> -->\n<div class="hero-video">\n  <video autoplay muted loop playsinline poster="/images/video-poster.jpg">\n    <source src="${videoUrl}" type="video/mp4" />\n  </video>\n  <div class="hero-video-dim"></div>\n</div>\n\n<style>\n.hero-video { position: fixed; inset: 0; z-index: -1; overflow: hidden; }\n.hero-video video { width: 100%; height: 100%; object-fit: cover; }\n.hero-video-dim {\n  position: absolute; inset: 0;\n  background: linear-gradient(180deg, rgba(10,10,24,.55), rgba(10,10,24,.75));\n}\n@media (prefers-reduced-motion: reduce) { .hero-video video { display: none; } }\n</style>`;
}

export default function CustomizePanel({ open, settings, saving, uploading, onClose, onSave, onUpload }: CustomizePanelProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (!open) return null;

  const activeUrl = settings.hero_video_url;
  const snippet = buildSnippet(activeUrl);

  const applyUrl = async (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError('Paste a video URL first.');
      return;
    }
    if (!/^https?:\/\/.+\.(mp4|webm|ogv)(\?.*)?$/i.test(trimmed) && !trimmed.startsWith('/')) {
      setUrlError('Use a direct .mp4 / .webm link (or a /local path).');
      return;
    }
    setUrlError('');
    await onSave({ hero_video_url: trimmed, video_enabled: true });
    setCustomUrl('');
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploadError('');
    if (!file.type.startsWith('video/')) {
      setUploadError('Please choose a video file (mp4 / webm).');
      return;
    }
    if (file.size > 40 * 1024 * 1024) {
      setUploadError('Video is too large - please keep it under 40MB.');
      return;
    }
    try {
      await onUpload(file);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed. Try again.');
    }
  };

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setUrlError('Copy failed - select the code manually.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-[#141428] sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
              <Film className="h-5 w-5 text-violet-500" />
              Background video studio
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Changes save instantly to the database and update the hero behind this panel.
            </p>
          </div>
          <button
            onClick={onClose}
            title="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900/5 text-slate-500 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-900/[0.04] p-4 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white">
              <Power className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Video background</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {settings.video_enabled ? 'Playing behind the hero' : 'Paused - poster image instead'}
              </div>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={settings.video_enabled}
            onClick={() => onSave({ video_enabled: !settings.video_enabled })}
            disabled={saving}
            className={`relative h-8 w-14 rounded-full transition ${settings.video_enabled ? 'bg-gradient-to-r from-pink-500 to-violet-500' : 'bg-slate-300 dark:bg-white/15'}`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${settings.video_enabled ? 'left-7' : 'left-1'}`}
            />
          </button>
        </div>

        <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pick a video
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {VIDEO_PRESETS.map((p) => {
            const active = activeUrl === p.url;
            return (
              <button
                key={p.id}
                onClick={() => onSave({ hero_video_url: p.url, video_enabled: true })}
                disabled={saving}
                className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition hover:scale-[1.02] ${
                  active
                    ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                    : 'border-slate-900/10 dark:border-white/10'
                } bg-slate-900/[0.03] dark:bg-white/5`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-400 text-white">
                  <Film className="h-5 w-5" />
                </span>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                  {p.label}
                  {active && <Check className="h-4 w-4 text-emerald-500" />}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{p.hint}</div>
              </button>
            );
          })}
        </div>

        <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Link2 className="h-4 w-4" /> Use your own link
        </h3>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://.../my-background.mp4"
            className="flex-1 rounded-xl border border-slate-900/15 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 dark:border-white/15 dark:text-white"
          />
          <button
            onClick={() => applyUrl(customUrl)}
            disabled={saving}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:scale-105 disabled:opacity-50 dark:bg-white dark:text-slate-900"
          >
            {saving ? 'Saving...' : 'Apply'}
          </button>
        </div>
        {urlError && <p className="mt-2 text-xs font-semibold text-rose-500">{urlError}</p>}

        <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Upload className="h-4 w-4" /> Upload your own clip
        </h3>
        <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-900/15 px-4 py-8 text-center transition hover:border-violet-500 hover:bg-violet-500/5 dark:border-white/15">
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {uploading ? (
            <span className="flex items-center gap-2 text-sm font-bold text-violet-500">
              <Loader2 className="h-5 w-5 animate-spin" /> Uploading...
            </span>
          ) : (
            <>
              <Upload className="h-6 w-6 text-violet-500" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Drop a video here or click to browse
              </span>
              <span className="text-xs text-slate-400">MP4 / WebM - up to 40MB - stored in the cloud</span>
            </>
          )}
        </label>
        {uploadError && <p className="mt-2 text-xs font-semibold text-rose-500">{uploadError}</p>}

        <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <SlidersHorizontal className="h-4 w-4" /> Readability dim - {Math.round(settings.overlay_opacity * 100)}%
        </h3>
        <input
          type="range"
          min={0}
          max={90}
          value={Math.round(settings.overlay_opacity * 100)}
          onChange={(e) => onSave({ overlay_opacity: Number(e.target.value) / 100 })}
          className="mt-3 w-full accent-violet-500"
        />
        <p className="mt-1 text-xs text-slate-400">
          Darkens the video so headline text stays readable. Higher = moodier.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-900/[0.04] p-4 text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
          <ImageIcon className="h-5 w-5 shrink-0 text-cyan-500" />
          Current poster (shows while the video loads):{' '}
          <span className="truncate font-mono">{settings.hero_poster_url}</span>
        </div>

        <h3 className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Code2 className="h-4 w-4" /> Add this to your GitHub Pages site
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Paste this snippet into your original portfolio HTML to get the same video background there.
        </p>
        <pre className="mt-3 max-h-48 overflow-auto rounded-2xl bg-slate-950 p-4 text-[11px] leading-relaxed text-emerald-300">
          {snippet}
        </pre>
        <button
          onClick={copySnippet}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-5 py-2.5 text-sm font-bold text-white transition hover:scale-105"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy snippet'}
        </button>
      </div>
    </div>
  );
}
