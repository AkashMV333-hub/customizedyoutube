# Calm Watching - Distraction-Free YouTube

A minimal, intentional YouTube web application built with Next.js and React. **No recommendations. No homepage feed. No suggested videos.** Just you, your search, and the content you choose to watch.

## Philosophy

This app is designed to eliminate dopamine-driven content consumption patterns. It removes all algorithmic suggestions, autoplay, related videos, and infinite scroll features that make YouTube addictive.

## Features

### ✨ Core Features

- **Search Page** - Minimalist landing page with only a search bar
- **Search Results** - Clean vertical list of videos with pagination (no infinite scroll)
- **Video Player** - Dedicated player page with YouTube embed stripped of recommendations
- **Watch History** - Automatically tracks videos you watch for easy recall
- **Pause Tracking** - Temporarily disable history recording with one click

### 🎨 Experience

- **Minimal UI** - Lots of whitespace, calm colors, no unnecessary animations
- **No Recommendations** - Zero algorithmic suggestions anywhere
- **No Trending** - No popular/trending videos
- **No Distractions** - Removed related videos, up next, autoplay, comments
- **Dark Mode** - Customizable dark/light mode support
- **Responsive Design** - Works great on desktop, tablet, and mobile

### 📍 Routes

| Route | Purpose |
|-------|---------|
| `/` | Search page - Start here |
| `/results?q=` | Search results with pagination |
| `/watch?v=` | Video player page |
| `/history` | Your watch history |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- YouTube Data API v3 key

### Installation

1. **Clone or set up the project**
```bash
cd youtube-distraction-free
npm install
```

2. **Get a YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "YouTube Data API v3"
   - Create an API key in "Credentials"
   - Copy your API key

3. **Configure Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local

# Add your API key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start searching.

## Project Structure

```
youtube-distraction-free/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home/search page
│   ├── globals.css         # Global styles
│   ├── results/
│   │   └── page.tsx        # Search results page
│   ├── watch/
│   │   └── page.tsx        # Video player page
│   └── history/
│       └── page.tsx        # Watch history page
├── components/
│   ├── SearchBar.tsx       # Search input form
│   ├── VideoCard.tsx       # Video result card
│   ├── VideoPlayer.tsx     # YouTube embed wrapper
│   └── HistoryList.tsx     # History list display
├── lib/
│   ├── youtube.ts          # YouTube API integration
│   └── history.ts          # localStorage history management
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Components

### SearchBar
Centered search input with minimal styling. Handles form submission and navigation.

### VideoCard
Grid card displaying video thumbnail, title, and channel name with hover effects.

### VideoPlayer
YouTube iframe embed with:
- `rel=0` - Disables related videos
- `modestbranding=1` - Removes YouTube branding
- Auto-tracks video to history on mount

### HistoryList
Displays watched videos with timestamps and delete functionality.

## Utilities

### `lib/youtube.ts`
YouTube Data API v3 integration:
- `searchVideos(query, maxResults, pageToken)` - Search for videos
- `getVideoDetails(videoId)` - Get video info and description

### `lib/history.ts`
localStorage management for watch history:
- `addToHistory(videoId, title, thumbnail)` - Add to history
- `getHistory()` - Retrieve all history items
- `clearHistory()` - Clear all history
- `removeFromHistory(videoId)` - Remove specific item
- `formatTimeAgo(timestamp)` - Format timestamps
- `isPauseTracking() / setPauseTracking()` - Pause tracking toggle

## Styling

Built with **Tailwind CSS** for minimal, responsive design. The color palette is intentionally muted to reduce visual stimulation:
- Clean whites and light grays for light mode
- Deep blacks for dark mode
- Minimal color accents
- No gradients or unnecessary effects

## API Quotas

The YouTube Data API has quotas:
- **Free tier**: 10,000 units per day
- Search: 100 units per request
- Video details: 1 unit per request

This means approximately:
- ~100 searches per day
- Much larger history tracking capacity

For more info, see [YouTube API Quotas](https://developers.google.com/youtube/v3/getting-started#quota)

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Linting
npm run lint
```

### Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: YouTube Data API v3
- **Storage**: localStorage (browser-based)
- **Deployment**: Vercel (recommended)

## Browser Storage

All watch history is stored in **localStorage**. This means:
- ✅ Data persists across sessions
- ✅ Private to that browser
- ✅ No server-side analytics
- ⚠️ Limited to ~5-10MB per domain
- ⚠️ Cleared when browser data is cleared

For persistent cross-device storage, you could integrate:
- MongoDB + Backend API
- Firebase Realtime Database
- Supabase

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Android)

## Security Notes

- API key is public (`NEXT_PUBLIC_*`) - this is safe for read-only YouTube API
- No personal data is collected
- All history stored locally in browser
- No tracking, analytics, or third-party services

## Customization

### Change Colors
Edit `app/globals.css` and Tailwind classes in components

### Add Features
- Backend history sync to MongoDB/Firebase
- Search filters (upload date, duration, etc.)
- Playlists support
- Notes/annotations on videos
- Focus mode with timer

### Remove Features
- Delete `app/history` to hide watch history
- Comment out VideoPlayer auto-track to disable history
- Modify pagination limits in results page

## Deployment

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

### Self-Hosted
```bash
npm run build
npm run start
# Runs on http://localhost:3000
```

## Troubleshooting

### "YouTube API key not configured"
- Make sure `.env.local` has `NEXT_PUBLIC_YOUTUBE_API_KEY` set
- Restart dev server after adding env var
- Check API key is valid in Google Cloud Console

### Search returns no results
- Verify API key has YouTube Data API v3 enabled
- Check quotas aren't exceeded
- Try less restrictive search terms
- Ensure API key isn't restricted to specific IPs/referrers

### History not persisting
- Check browser's localStorage isn't disabled
- Verify browser privacy mode isn't active
- Check browser storage quota isn't full

### Video won't play
- Ensure video ID is correct
- Video might be restricted/deleted
- Check browser allows YouTube embeds
- Some videos can't be embedded (check video settings)

## Contributing

This is a minimal project for intentional watching. Contributions should maintain the philosophy of minimal, distraction-free design.

## License

MIT

## Comparison to YouTube

| Feature | YouTube | Calm Watching |
|---------|---------|---------------|
| Search | ✅ | ✅ |
| Video Player | ✅ | ✅ |
| Watch History | ✅ | ✅ |
| Recommendations | ✅ | ❌ |
| Homepage Feed | ✅ | ❌ |
| Related Videos | ✅ | ❌ |
| Autoplay | ✅ | ❌ |
| Shorts | ✅ | ❌ |
| Comments | ✅ | ❌ |
| Distracting Animations | ✅ | ❌ |
| Intentional Focus | ❌ | ✅ |

## Resources

- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

**Make watching intentional. Remove the algorithms.**
