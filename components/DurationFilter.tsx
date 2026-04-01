'use client';

import { VideoDuration } from '@/lib/youtube';

interface DurationFilterProps {
  selectedDuration: VideoDuration;
  onDurationChange: (duration: VideoDuration) => void;
}

export default function DurationFilter({
  selectedDuration,
  onDurationChange,
}: DurationFilterProps) {
  const filters: { value: VideoDuration; label: string; description: string }[] = [
    { value: 'all', label: 'All Durations', description: 'Any length' },
    { value: 'short', label: 'Short', description: '< 4 min' },
    { value: 'medium', label: 'Medium', description: '4-20 min' },
    { value: 'long', label: 'Long', description: '> 20 min' },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Video Duration
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onDurationChange(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              selectedDuration === filter.value
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            title={filter.description}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
