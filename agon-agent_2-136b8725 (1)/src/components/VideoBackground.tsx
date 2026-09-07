import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface VideoBackgroundProps {
  videoUrl: string;
  posterUrl: string;
  overlayOpacity: number;
  enabled: boolean;
}

export default function VideoBackground({ videoUrl, posterUrl, overlayOpacity, enabled }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    setPlaying(true);
    const el = videoRef.current;
    if (el) {
      el.load();
      el.play().catch(() => setPlaying(false));
    }
  }, [videoUrl, enabled]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const showVideo = enabled && !failed;
  const dim = Math.min(0.92, Math.max(0, overlayOpacity));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={!enabled}>
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-violet-700 to-cyan-600" />

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          poster={posterUrl}
          disablePictureInPicture
          onError={() => setFailed(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-slate-950" style={{ opacity: dim }} />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/60 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-transparent to-cyan-500/20" />

      {showVideo && (
        <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2 sm:right-8">
          <button
            onClick={togglePlay}
            title={playing ? 'Pause background video' : 'Play background video'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMuted((m) => !m)}
            title={muted ? 'Unmute background video' : 'Mute background video'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
