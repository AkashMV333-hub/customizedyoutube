'use client';

import { useEffect } from 'react';
import { addToHistory } from '@/lib/history';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

export default function VideoPlayer({ videoId, title, thumbnail }: VideoPlayerProps) {
  useEffect(() => {
    // Add to watch history when component mounts
    addToHistory(videoId, title, thumbnail);
  }, [videoId, title, thumbnail]);

  // YouTube embed parameters to remove distractions
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
