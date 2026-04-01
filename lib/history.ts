export interface HistoryItem {
  videoId: string;
  title: string;
  thumbnail: string;
  watchedAt: number; // timestamp in milliseconds
}

const STORAGE_KEY = 'youtube_watch_history';
const PAUSE_TRACKING_KEY = 'youtube_pause_tracking';

/**
 * Get all history items from localStorage
 */
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

/**
 * Add a video to the watch history
 */
export function addToHistory(videoId: string, title: string, thumbnail: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Check if pause tracking is enabled
  const isPausedTracking = localStorage.getItem(PAUSE_TRACKING_KEY) === 'true';
  if (isPausedTracking) {
    return;
  }

  try {
    const history = getHistory();

    // Remove if already exists (to avoid duplicates)
    const filtered = history.filter(item => item.videoId !== videoId);

    // Add new item at the beginning
    const newItem: HistoryItem = {
      videoId,
      title,
      thumbnail,
      watchedAt: Date.now(),
    };

    const updated = [newItem, ...filtered];

    // Keep only last 100 items
    const limited = updated.slice(0, 100);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

/**
 * Remove a specific item from history
 */
export function removeFromHistory(videoId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const history = getHistory();
    const updated = history.filter(item => item.videoId !== videoId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing from history:', error);
  }
}

/**
 * Get pause tracking status
 */
export function isPauseTracking(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(PAUSE_TRACKING_KEY) === 'true';
}

/**
 * Set pause tracking status
 */
export function setPauseTracking(paused: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(PAUSE_TRACKING_KEY, paused ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting pause tracking:', error);
  }
}

/**
 * Format a timestamp for display
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString();
}
