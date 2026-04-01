'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { VideoDuration } from '@/lib/youtube';

interface SearchBarProps {
  videoDuration?: VideoDuration;
}

export default function SearchBar({ videoDuration = 'all' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams({
        q: query,
        ...(videoDuration !== 'all' && { duration: videoDuration }),
      });
      router.push(`/results?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 bg-white"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
