'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SearchResult } from '@/lib/youtube';

interface VideoCardProps {
  video: SearchResult;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch?v=${video.videoId}`}>
      <div className="group cursor-pointer hover:opacity-80 transition-opacity">
        <div className="relative w-full bg-gray-200 rounded-lg overflow-hidden mb-3">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={320}
            height={180}
            className="w-full h-auto"
            priority={false}
          />
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {video.channelName}
        </p>
      </div>
    </Link>
  );
}
