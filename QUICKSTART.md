## 🎥 Calm Watching - Distraction-Free YouTube

### Project Location
📁 **D:\youtube-distraction-free**

### Quick Links
- 📖 **Setup**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 📚 **Full Docs**: See [README.md](./README.md)
- 🏗️ **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

### Quick Start (3 steps)
```bash
# 1. Setup - Get API key from Google Cloud Console
#    Add to .env.local: NEXT_PUBLIC_YOUTUBE_API_KEY=your_key

# 2. Install (if needed)
npm install

# 3. Run
npm run dev
#    Open http://localhost:3000
```

### Key Files
```
app/
  page.tsx                  # Home/Search
  results/page.tsx          # Search Results
  watch/page.tsx            # Video Player
  history/page.tsx          # Watch History
  layout.tsx                # Root Layout
  globals.css               # Styles

components/
  SearchBar.tsx             # Search Input
  VideoCard.tsx             # Video Result Card
  VideoPlayer.tsx           # YouTube Embed
  HistoryList.tsx           # History Display

lib/
  youtube.ts                # YouTube API
  history.ts                # localStorage Mgmt

.env.local                  # API Key (DO NOT COMMIT)
```

### NPM Scripts
```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Build for production
npm run start      # Run production build
npm run lint      # Check for lint errors
```

### What's Included
✅ Search functionality
✅ Video player without recommendations
✅ Watch history with localStorage
✅ Pagination (no infinite scroll)
✅ Dark/light mode
✅ Responsive design
✅ Minimal, calm UI

### What's NOT Included  
❌ Recommendations
❌ Homepage feed
❌ Related videos
❌ Autoplay
❌ Comments
❌ Notifications
❌ Infinite scroll
❌ Analytics

### Features
- 🔍 **Search**: Clean search interface
- 📺 **Watch**: YouTube embed with distractions removed
- 📋 **History**: Auto-tracked watched videos
- ⏸️ **Pause Tracking**: Temporarily disable history
- 🌙 **Dark Mode**: Light/dark theme support
- 📱 **Responsive**: Mobile-friendly design

### Technology Stack
- Next.js 16 (React framework with App Router)
- TypeScript (type safety)
- Tailwind CSS (styling)
- YouTube Data API v3 (video search)
- localStorage (browser storage)

### Common Issues & Solutions

**"YouTube API key not configured"**
→ Add key to .env.local and restart dev server

**Search returns no results**
→ Verify API key is valid and YouTube API is enabled

**Video player blank**
→ Video might be region-restricted or not embeddable

**History not saving**
→ Ensure localStorage is enabled in browser

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting.

### Next Steps
1. ✅ Set up API key (SETUP_GUIDE.md step 1-2)
2. ✅ Run `npm run dev`
3. ✅ Visit http://localhost:3000
4. ✅ Search for a video
5. ✅ Click to watch
6. ✅ Check history page

### Customization Ideas
- Change colors in `app/globals.css`
- Add filters to search
- Sync history to backend
- Create playlists feature
- Add video notes
- Implement watch timers

### For Production
```bash
# Build
npm run build

# Deploy on Vercel (easiest)
npm install -g vercel
vercel

# Or Docker
docker build -t calm-watching .
docker run -p 3000:3000 -e NEXT_PUBLIC_YOUTUBE_API_KEY=key calm-watching
```

### Need Help?
- 📖 README.md - Full documentation
- 🏗️ ARCHITECTURE.md - Technical details
- 📋 SETUP_GUIDE.md - Step-by-step setup
- 🔗 [YouTube API Docs](https://developers.google.com/youtube/v3)
- 🔗 [Next.js Docs](https://nextjs.org/docs)

---

**Intentional watching starts here. 🎬**

Made to help you focus on content, not algorithms.
