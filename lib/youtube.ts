const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export type VideoDuration = 'all' | 'short' | 'medium' | 'long';

export interface YouTubeVideo {
  videoId: string;
  title: string;
  channelName: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
}

export interface SearchResult {
  videoId: string;
  title: string;
  channelName: string;
  thumbnail: string;
  duration?: string;
}

/**
 * Convert ISO 8601 duration format to readable time (e.g., PT10M30S -> 10:30)
 */
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Search for videos using the YouTube API
 */
export async function searchVideos(query: string, maxResults: number = 20, pageToken?: string | null, videoDuration: VideoDuration = 'all') {
  if (!API_KEY) {
    throw new Error('YouTube API key not configured. Set NEXT_PUBLIC_YOUTUBE_API_KEY env var.');
  }

  try {
    const params = new URLSearchParams({
      key: API_KEY,
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults.toString(),
      ...(pageToken && { pageToken }),
      ...(videoDuration !== 'all' && { videoDuration }),
    });

    const response = await fetch(`${API_BASE}/search?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    let results: SearchResult[] = data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelName,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    }));

    // Fetch duration for all videos
    const videoIds = results.map(r => r.videoId).join(',');
    const durationParams = new URLSearchParams({
      key: API_KEY,
      part: 'contentDetails',
      id: videoIds,
    });

    const durationResponse = await fetch(`${API_BASE}/videos?${durationParams}`);
    if (durationResponse.ok) {
      const durationData = await durationResponse.json();
      const durationMap = new Map(
        durationData.items.map((item: any) => [
          item.id,
          parseDuration(item.contentDetails.duration)
        ])
      );
      results = results.map(result => ({
        ...result,
        duration: durationMap.get(result.videoId),
      }));
    }

    return {
      results,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
    };
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
}

/**
 * Get detailed information about a video
 */
export async function getVideoDetails(videoId: string): Promise<YouTubeVideo> {
  if (!API_KEY) {
    throw new Error('YouTube API key not configured. Set NEXT_PUBLIC_YOUTUBE_API_KEY env var.');
  }

  try {
    const params = new URLSearchParams({
      key: API_KEY,
      part: 'snippet,contentDetails',
      id: videoId,
    });

    const response = await fetch(`${API_BASE}/videos?${params}`);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }

    const item = data.items[0];

    return {
      videoId: item.id,
      title: item.snippet.title,
      channelName: item.snippet.channelName,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      duration: parseDuration(item.contentDetails.duration),
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}
