'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface VideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
}

export default function URLPlayer() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (youtubeUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const handlePlayVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube link.');
      setLoading(false);
      return;
    }

    try {
      // Fetch video details to get title and thumbnail
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );

      if (!response.ok) {
        throw new Error('Video not found. Please check the URL.');
      }

      const data = await response.json();
      setVideoInfo({
        videoId,
        title: data.title,
        thumbnail: data.thumbnail_url,
      });
      setUrl('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load video. Please check the URL.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {videoInfo ? (
        <div>
          <button
            onClick={() => setVideoInfo(null)}
            className="mb-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg transition-colors"
          >
            ← Back
          </button>
          <VideoPlayer
            videoId={videoInfo.videoId}
            title={videoInfo.title}
            thumbnail={videoInfo.thumbnail}
          />
          <h2 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
            {videoInfo.title}
          </h2>
        </div>
      ) : (
        <form onSubmit={handlePlayVideo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paste YouTube Video Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(null);
                }}
                placeholder="e.g., https://www.youtube.com/watch?v=..."
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              />
              <button
                type="submit"
                disabled={!url.trim() || loading}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Play'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
