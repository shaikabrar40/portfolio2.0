import supabase from './db-client.js';

const DEFAULTS = {
  id: 1,
  hero_video_url: '/videos/hero-gradient.mp4',
  hero_poster_url: '/images/video-poster.jpg',
  overlay_opacity: 0.65,
  video_enabled: true,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (error) {
        return res.status(200).json(DEFAULTS);
      }
      return res.status(200).json({ ...DEFAULTS, ...data });
    }
    if (req.method === 'PUT') {
      const { hero_video_url, hero_poster_url, overlay_opacity, video_enabled } = req.body || {};
      const patch = { id: 1 };
      if (hero_video_url !== undefined) patch.hero_video_url = hero_video_url;
      if (hero_poster_url !== undefined) patch.hero_poster_url = hero_poster_url;
      if (overlay_opacity !== undefined) {
        const v = Number(overlay_opacity);
        if (Number.isNaN(v) || v < 0 || v > 0.95) {
          return res.status(400).json({ error: 'overlay_opacity must be between 0 and 0.95' });
        }
        patch.overlay_opacity = v;
      }
      if (video_enabled !== undefined) patch.video_enabled = Boolean(video_enabled);
      const { data, error } = await supabase
        .from('site_settings')
        .upsert(patch, { onConflict: 'id' })
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (settings):', err);
    return res.status(500).json({ error: err.message });
  }
}
