'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoDetails, YouTubeVideo } from '@/lib/youtube';
import Link from 'next/link';

function WatchContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v') || '';

  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) {
      setLoading(false);
      return;
    }

    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const videoData = await getVideoDetails(videoId);
        setVideo(videoData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load video'
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      )}

      {!loading && (error || !video) && (
        <>
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Home
              </Link>
            </div>
          </header>
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">
                {error || 'Video not found'}
              </p>
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Go back to search
              </Link>
            </div>
          </main>
        </>
      )}

      {!loading && !error && video && (
        <>
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Home
              </Link>
              <Link
                href="/history"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                History
              </Link>
            </div>
          </header>

          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
            <VideoPlayer
              videoId={videoId}
              title={video.title}
              thumbnail={video.thumbnail}
            />

            <div className="mt-8">
              <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                {video.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {video.channelName}
              </p>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><p className="text-gray-600 dark:text-gray-400">Loading...</p></div>}>
      <WatchContent />
    </Suspense>
  );
}
