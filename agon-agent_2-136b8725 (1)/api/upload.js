import supabase from './db-client.js';

const BUCKET = 'portfolio-videos';
const MAX_BYTES = 40 * 1024 * 1024;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fileName, fileBase64, contentType } = req.body || {};
    if (!fileName || !fileBase64) {
      return res.status(400).json({ error: 'fileName and fileBase64 are required' });
    }
    const buffer = Buffer.from(fileBase64, 'base64');
    if (buffer.length > MAX_BYTES) {
      return res.status(400).json({ error: 'Video is too large. Please keep uploads under 40MB.' });
    }
    const safe = String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
    const path = `backgrounds/${Date.now()}-${safe}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: contentType || 'video/mp4', upsert: false });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return res.status(200).json({ url: urlData.publicUrl, path });
  } catch (err) {
    console.error('API error (upload):', err);
    return res.status(500).json({ error: err.message });
  }
}
