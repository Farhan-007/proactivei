import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Calendar, FileText, ArrowRight, Video, Radio, VolumeX } from 'lucide-react';

export default function Media({ media }) {
  const [playingPodcast, setPlayingPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const audioRef = useRef(null);

  const podcasts = media.filter(m => m.type === 'Podcast');
  const videos = media.filter(m => m.type === 'Video');
  const press = media.filter(m => m.type === 'Press');

  useEffect(() => {
    if (playingPodcast) {
      if (isPlaying) {
        audioRef.current?.play().catch(err => console.log("Play failed", err));
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying, playingPodcast]);

  const handleSelectPodcast = (pod) => {
    if (playingPodcast?.id === pod.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingPodcast(pod);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 1455); // fallback default
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      audioRef.current.muted = vol === 0;
    }
  };

  const toggleMute = () => {
    const muteState = !isMuted;
    setIsMuted(muteState);
    if (audioRef.current) {
      audioRef.current.muted = muteState;
    }
  };

  const formatTime = (timeSecs) => {
    if (isNaN(timeSecs)) return "00:00";
    const mins = Math.floor(timeSecs / 60);
    const secs = Math.floor(timeSecs % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center' }}>
        <span className="section-subtitle">Multimedia Archives</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Media Library</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
          Listen to our weekly podcasts, watch keynote speech recordings, or browse press articles introducing our design values.
        </p>
      </section>

      {/* Hidden Audio Ref Element */}
      {playingPodcast && (
        <audio
          ref={audioRef}
          src={playingPodcast.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Grid: Podcasts & Video Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '5rem',
        textAlign: 'left'
      }}>
        
        {/* Left: Interactive Podcast Player & Feed */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <Radio size={20} color="var(--accent-orange)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Ecosystem Podcast</h3>
          </div>

          {/* Active Player Card */}
          {playingPodcast ? (
            <div className="glass-card" style={{
              background: 'rgba(249, 115, 22, 0.04)',
              border: '1px solid rgba(249, 115, 22, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderRadius: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-orange)', fontWeight: 600 }}>NOW PLAYING</span>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginTop: '0.15rem' }}>{playingPodcast.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Released: {playingPodcast.date}</span>
              </div>

              {/* Controls bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Timeline slider */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    width: '100%',
                    accentColor: 'var(--accent-orange)',
                    cursor: 'pointer',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Action play/pause & volume */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: 'var(--accent-glow)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000'
                  }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                {/* Volume bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ width: '60px', accentColor: 'var(--accent-orange)' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '2rem 1rem',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              border: '1px dashed var(--glass-border)',
              borderRadius: '8px'
            }}>
              <span>Select an episode from the feed below to stream.</span>
            </div>
          )}

          {/* Podcast episode selection list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {podcasts.map(pod => {
              const isActive = playingPodcast?.id === pod.id;
              return (
                <div 
                  key={pod.id}
                  onClick={() => handleSelectPodcast(pod)}
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                    border: isActive ? '1px solid rgba(249,115,22,0.2)' : '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '10px'
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: isActive ? 'var(--accent-orange)' : '#fff' }}>{pod.title}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pod.date} • {pod.duration}</span>
                  </div>
                  <div style={{
                    background: isActive ? 'var(--accent-glow)' : 'rgba(255,255,255,0.05)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#000' : '#fff'
                  }}>
                    {isActive && isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Keynote Speeches & Lecture Video Grids */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <Video size={20} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Lectures & Keynotes</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {videos.map(vid => (
              <div key={vid.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Simulated video poster player */}
                <div 
                  onClick={() => setActiveVideoUrl(vid.url)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '160px',
                    background: '#1F2937',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=80)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <div style={{
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)'
                  }}>
                    <Play size={20} style={{ marginLeft: '2px' }} />
                  </div>
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#fff' }}>
                    {vid.duration}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{vid.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recorded: {vid.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Press Coverage & Publications Section */}
      <section style={{ textAlign: 'left' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Press Logs</span>
          <h2 className="section-title">Press Coverage & Interviews</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {press.map(pr => (
            <div key={pr.id} className="glass-panel hover-grow" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 600 }}>{pr.date}</span>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>{pr.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Exploring how our design philosophy is shaping organizational strategy on regional and global stages.
              </p>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                Read Article <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal Overlay */}
      {activeVideoUrl && (
        <div 
          onClick={() => setActiveVideoUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 15, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            zIndex: 1100
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '800px',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <video 
              src={activeVideoUrl} 
              controls 
              autoPlay
              style={{ width: '100%', height: '100%' }}
            />
            <button 
              onClick={() => setActiveVideoUrl(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
