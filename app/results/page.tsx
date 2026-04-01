'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import VideoCard from '@/components/VideoCard';
import { searchVideos, SearchResult, VideoDuration } from '@/lib/youtube';
import Link from 'next/link';

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const durationParam = (searchParams.get('duration') || 'all') as VideoDuration;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const loadResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchVideos(query, 20, null, durationParam);
        setResults(data.results);
        setNextPageToken(data.nextPageToken || null);
        setCurrentPageToken(null);
        setPageHistory([]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to search videos'
        );
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [query, durationParam]);

  const handleNextPage = async () => {
    if (!nextPageToken || !query) return;

    try {
      setLoading(true);
      setPageHistory([...pageHistory, currentPageToken || 'initial']);
      const data = await searchVideos(query, 20, nextPageToken, durationParam);
      setResults(data.results);
      setCurrentPageToken(nextPageToken);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load next page'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = async () => {
    if (pageHistory.length === 0 || !query) return;

    try {
      setLoading(true);
      const prevToken = pageHistory[pageHistory.length - 1];
      const newHistory = pageHistory.slice(0, -1);

      if (prevToken === 'initial') {
        const data = await searchVideos(query, 20, null, durationParam);
        setResults(data.results);
        setCurrentPageToken(null);
        setNextPageToken(data.nextPageToken || null);
      } else {
        const data = await searchVideos(query, 20, prevToken, durationParam);
        setResults(data.results);
        setCurrentPageToken(prevToken);
        setNextPageToken(data.nextPageToken || null);
      }

      setPageHistory(newHistory);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load previous page'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back
            </Link>
            <Link
              href="/history"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              History
            </Link>
          </div>
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {query && (
          <h2 className="text-xl font-light text-gray-900 dark:text-white mb-6">
            Results for "{query}"
          </h2>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        ) : results.length === 0 && !error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No results found</p>
          </div>
        ) : (
          <>
            {results.length > 0 && (
              <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Showing {results.length} videos
                {durationParam !== 'all' && ` (${durationParam} duration)`}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </div>

            {(nextPageToken || pageHistory.length > 0) && (
              <div className="flex justify-center items-center gap-4 py-8">
                <button
                  onClick={handlePrevPage}
                  disabled={pageHistory.length === 0 || loading}
                  className="px-6 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!nextPageToken || loading}
                  className="px-6 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><p className="text-gray-600 dark:text-gray-400">Loading...</p></div>}>
      <ResultsContent />
    </Suspense>
  );
}
