'use client';

import { useEffect, useRef, useState } from 'react';
import { addToHistory } from '@/lib/history';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

export default function VideoPlayer({ videoId, title, thumbnail }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Add to watch history when component mounts
    addToHistory(videoId, title, thumbnail);
  }, [videoId, title, thumbnail]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  // YouTube embed parameters to remove distractions
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&fs=1`;

  return (
    <div 
      ref={playerRef}
      className={`bg-black rounded-lg overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full'
      }`}
    >
      <div className="relative w-full" style={{ paddingBottom: isFullscreen ? '0' : '56.25%', height: isFullscreen ? '100vh' : 'auto' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {!isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded transition-all"
            title="Fullscreen (F)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
