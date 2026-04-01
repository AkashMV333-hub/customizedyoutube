'use client';

export type DurationOption = 'all' | 'under3' | '3-20' | '20-60' | 'over60';

interface DurationFilterProps {
  selectedDuration: DurationOption;
  onDurationChange: (duration: DurationOption) => void;
}

export default function DurationFilter({
  selectedDuration,
  onDurationChange,
}: DurationFilterProps) {
  const filters: { value: DurationOption; label: string }[] = [
    { value: 'all', label: 'All Durations' },
    { value: 'under3', label: 'Under 3 min' },
    { value: '3-20', label: '3 - 20 min' },
    { value: '20-60', label: '20 min - 1 hr' },
    { value: 'over60', label: 'More than 1 hr' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onDurationChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedDuration === filter.value
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
