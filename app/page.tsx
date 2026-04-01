import SearchBar from '@/components/SearchBar';
import URLPlayer from '@/components/URLPlayer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end items-center gap-4">
          <Link
            href="/history"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            History
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-center mb-8 text-3xl font-light text-gray-900 dark:text-white">
            Calm Watching
          </h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Search & Discover
              </h2>
              <SearchBar />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400">
                  Or
                </span>
              </div>
            </div>

            <URLPlayer />
          </div>
        </div>
      </main>
    </div>
  );
}
