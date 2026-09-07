export interface Project {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  tags: string[] | null;
  live_url: string | null;
  code_url: string | null;
  badge: string | null;
  display_order: number | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string | null;
  level: number | null;
  display_order: number | null;
}

export interface EducationItem {
  id: number;
  period: string | null;
  title: string | null;
  school: string | null;
  description: string | null;
  status: string | null;
  display_order: number | null;
}

export interface SiteSettings {
  id: number;
  hero_video_url: string;
  hero_poster_url: string;
  overlay_opacity: number;
  video_enabled: boolean;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  hero_video_url: '/videos/hero-gradient.mp4',
  hero_poster_url: '/images/video-poster.jpg',
  overlay_opacity: 0.65,
  video_enabled: true,
};

export interface VideoPreset {
  id: string;
  label: string;
  hint: string;
  url: string;
}

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'aurora',
    label: 'Aurora Flow',
    hint: 'Built-in · colourful gradient waves',
    url: '/videos/hero-gradient.mp4',
  },
  {
    id: 'waves',
    label: 'Ocean Waves',
    hint: 'Remote · calming water',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
  },
  {
    id: 'ink',
    label: 'Ink in Water',
    hint: 'Remote · artistic swirl',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-21658-large.mp4',
  },
];

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.error) msg = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}
