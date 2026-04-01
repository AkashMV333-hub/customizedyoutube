'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HistoryItem, formatTimeAgo, removeFromHistory } from '@/lib/history';
import { useState } from 'react';

interface HistoryListProps {
  items: HistoryItem[];
  onDelete?: (videoId: string) => void;
}

export default function HistoryList({ items, onDelete }: HistoryListProps) {
  const [history, setHistory] = useState(items);

  const handleDelete = (videoId: string) => {
    removeFromHistory(videoId);
    setHistory(history.filter(item => item.videoId !== videoId));
    onDelete?.(videoId);
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No videos watched yet. Start searching to build your history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.videoId}
          className="flex gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
        >
          <Link href={`/watch?v=${item.videoId}`} className="flex-shrink-0">
            <div className="relative w-32 h-20 bg-gray-200 rounded overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link href={`/watch?v=${item.videoId}`}>
              <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
                {item.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formatTimeAgo(item.watchedAt)}
            </p>
          </div>

          <button
            onClick={() => handleDelete(item.videoId)}
            className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
