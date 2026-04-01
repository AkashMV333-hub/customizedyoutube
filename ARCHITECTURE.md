# Calm Watching - Architecture & Features

## 🎯 Core Philosophy

This app implements a **dopamine-minimization approach** to YouTube consumption:

| Removed | Reason |
|---------|--------|
| Recommendations | Algorithmic hijacking of attention |
| Homepage feed | Infinite scroll addiction |
| Related videos | Sidebar distraction |
| Autoplay | Auto-continuation without intention |
| Comments | Social distraction |
| Notifications | Interruption anxiety |
| Shorts | Variable reward loop |

**What remains**: You, your search, your choice.

---

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Storage**: Browser localStorage

### API Integration
- **Service**: YouTube Data API v3
- **Auth**: API Key (public-facing, read-only)
- **Rate Limits**: 10,000 units/day (free)

### Pages & Routes

```
app/
├── page.tsx              # / - Home/Search (default route)
├── results/page.tsx      # /results?q=... - Search results
├── watch/page.tsx        # /watch?v=... - Video player
├── history/page.tsx      # /history - Watch history
├── layout.tsx            # Root layout wrapper
└── globals.css           # Global styles
```

### Components

**SearchBar** - Minimal search input
- Client component
- Handles form submission
- Navigates to `/results?q=`

**VideoCard** - Result display
- Thumbnail, title, channel
- Hover effect
- Links to watch page

**VideoPlayer** - YouTube embed wrapper
- `rel=0` (no related videos)
- `modestbranding=1` (minimal branding)
- Auto-tracks to history
- Aspect ratio responsive (16:9)

**HistoryList** - Watched videos display
- Shows thumbnail, title, time
- Delete button per item
- Formatted timestamps ("2 hours ago")

### Utilities

**lib/youtube.ts** - API Functions
```typescript
searchVideos(query, maxResults?, pageToken?)
  → {results, nextPageToken, prevPageToken}

getVideoDetails(videoId)
  → {videoId, title, channelName, thumbnail, description, publishedAt}
```

**lib/history.ts** - localStorage Management
```typescript
getHistory()                          // Get all items
addToHistory(videoId, title, thumb)  // Add/update entry
clearHistory()                        // Delete all
removeFromHistory(videoId)            // Delete one
formatTimeAgo(timestamp)              // "2 hours ago"
isPauseTracking() / setPauseTracking() // Pause toggle
```

---

## 📊 Data Flow

### Search Flow
```
User Input
  ↓
SearchBar submission
  ↓
useRouter.push(`/results?q=...`)
  ↓
ResultsPage reads searchParams
  ↓
searchVideos() API call
  ↓
Display grid of VideoCards
  ↓
User clicks video
  ↓
Navigate to /watch?v=videoId
```

### History Flow
```
VideoPlayer mounts
  ↓
addToHistory() called
  ↓
Check if tracking paused
  ↓
Save to localStorage
  ↓
HistoryPage reads from localStorage
  ↓
Display HistoryList component
```

### Pagination Flow
```
Initial search
  ↓
Save nextPageToken
  ↓
User clicks "Next"
  ↓
searchVideos(query, pageToken)
  ↓
Save current token to history
  ↓
Display new results
  ↓
User clicks "Previous"
  ↓
Load from token history
```

---

## 🎨 Design System

### Color Palette
- **Light Mode**: White background, gray/black text
- **Dark Mode**: Black background, white/gray text
- **Accents**: Minimal, only on interactive elements
- **Calm Colors**: No bright reds/oranges/yellows

### Typography
- **Heading**: Light weight, generous spacing
- **Body**: Regular weight, good contrast
- **Size**: Readable without zoom

### Spacing
- **Generous**: Lots of whitespace
- **Breathing Room**: 4-8px gaps minimum
- **Max Width**: Constrained to prevent visual overwhelm

### Components Styling
- No animations (except hover/transition)
- No shadows (clean flat design)
- No gradients (solid colors only)
- No notifications or badges
- Rounded corners (8-12px)

---

## 🔧 Key Features Explained

### Watch History

**Storage**: localStorage (browser)
  - Pros: No privacy concerns, fast, offline
  - Cons: Limited to ~5MB, device-specific

**Structure**:
```typescript
{
  videoId: string
  title: string
  thumbnail: string
  watchedAt: timestamp (milliseconds)
}
```

**Features**:
- Auto-add on video view
- Keeps last 100 items
- Can delete individual items
- Can clear all
- Can pause tracking temporarily

### Pagination

**Why not infinite scroll?**
- Infinite scroll is addictive pattern
- Requires deliberate action (click button)
- Easier to stop/exit

**Implementation**:
- Save nextPageToken from API
- Track page history for "Back"
- Store previous tokens
- Navigate between pages explicitly

### YouTube Embed Parameters

**rel=0** (Disable related videos)
- Default: rel=1 (shows recommendations)
- Our setting: rel=0 (no related videos)

**modestbranding=1** (Minimal branding)
- Reduces YouTube logo visibility
- Cleaner player appearance

**controls=1** (Default controls)
- User can play, pause, seek
- No recommended videos in mini-player

---

## 🚀 Performance Optimizations

### Frontend
- Next Image optimization (automatic)
- Code splitting (per route)
- Lazy loading (components)
- CSS-in-JS (Tailwind purging)

### API
- Search caching (not implemented, but possible)
- Debounce search input (could add)
- Request rate limiting (handled by quota)

### Storage
- localStorage is synchronous (keep data small)
- Limit history to 100 items
- Clear old entries automatically

---

## 🔒 Privacy & Security

**No Data Collection**:
- No analytics
- No tracking pixels
- No logging
- No cookies (except localStorage)

**API Key Safety**:
- Public-facing API key (NEXT_PUBLIC_*)
- Read-only YouTube API
- No authentication needed
- No sensitive data in responses

**User Data**:
- Stored locally in browser
- No backend transmission
- No third parties
- Survives browser restart
- Clear button for total wipe

---

## 💡 Extension Ideas

### Potential Features (Not Included)

1. **Local Playlists**
   - Save custom video collections
   - Reorder and rename
   - Export/import

2. **Sync History to Backend**
   - MongoDB database
   - Sync across devices
   - Optional account system

3. **Advanced Search**
   - Filter by date posted
   - Filter by video length
   - Sort by relevance/upload date

4. **Video Notes**
   - Annotate videos with notes
   - Bookmark timestamps
   - Export notes

5. **Watch Time Limits**
   - Set daily limits
   - Timer with warning
   - Pause reminder after X minutes

6. **Channel Following**
   - Subscribe to channels
   - Get updates (manually, no push)
   - Separate section for follows

7. **Keyword Blocking**
   - Hide certain search results
   - Block distracting terms
   - Custom filters

8. **Download Support**
   - Save videos locally (if legal)
   - Watch offline
   - Manage storage

---

## 🧪 Testing Checklist

- [ ] Search works and returns results
- [ ] Pagination (next/previous) works
- [ ] Video plays without related videos showing
- [ ] History auto-records when watching
- [ ] History displays with correct timestamps
- [ ] Delete history item works
- [ ] Clear all history works
- [ ] Pause tracking toggle works
- [ ] Dark mode toggles properly
- [ ] Mobile responsive (check on phone)
- [ ] Back buttons navigate correctly
- [ ] History link visible on all pages
- [ ] Search bar available on results page
- [ ] No console errors

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Excellent |
| Edge 90+ | ✅ Excellent |
| Firefox 88+ | ✅ Excellent |
| Safari 15+ | ✅ Good |
| Mobile Chrome | ✅ Good |
| Mobile Safari | ✅ Good |
| IE 11 | ❌ No |

---

## 🔄 Update/Maintenance

### Keeping Dependencies Current
```bash
npm update                    # Update minor versions
npm outdated                  # Check what's outdated
npm install next@latest       # Update Next.js
```

### YouTube API Changes
- Regularly check [Google Workspace Updates](https://workspace.google.com/blog/)
- Monitor [YouTube API Status Dashboard](https://developers.google.com/youtube/status)
- Subscribe to API announcements

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Web API Reference](https://developer.mozilla.org/en-US/docs/)

---

**Made with intention. Built for calm. Zero algorithms. 🎥✨**
