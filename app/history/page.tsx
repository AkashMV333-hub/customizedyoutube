'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HistoryList from '@/components/HistoryList';
import { getHistory, clearHistory, HistoryItem, isPauseTracking, setPauseTracking } from '@/lib/history';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [pauseTracking, setPause] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
    setPause(isPauseTracking());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your entire watch history? This cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleTogglePauseTracking = () => {
    const newValue = !pauseTracking;
    setPauseTracking(newValue);
    setPause(newValue);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-8">
          Watch History
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleTogglePauseTracking}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pauseTracking
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {pauseTracking ? '⏸ Tracking Paused' : '⏹ Pause Tracking'}
          </button>

          <button
            onClick={handleClearHistory}
            disabled={history.length === 0}
            className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear History
          </button>
        </div>

        {pauseTracking && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Tracking is paused. Videos you watch will not be recorded in your history.
            </p>
          </div>
        )}

        <HistoryList items={history} onDelete={() => setHistory(getHistory())} />
      </main>
    </div>
  );
}
