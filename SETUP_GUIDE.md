# Setup Guide for Calm Watching

## Quick Start

1. **Get YouTube API Key** (2 minutes)
2. **Add API Key to `.env.local`**
3. **Start Development Server**
4. **Visit http://localhost:3000**

## Step-by-Step Setup

### 1️⃣ Get YouTube Data API v3 Key

#### Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "NEW PROJECT"
4. Name it "Calm Watching" (or any name)
5. Click "CREATE"
6. Wait for the project to be created (may take a moment)

#### Enable YouTube Data API v3
1. In the Google Cloud Console, search for "YouTube Data API v3"
2. Click on it in the results
3. Click the "ENABLE" button
4. Wait for it to enable

#### Create an API Key
1. In the left sidebar, click "Credentials"
2. Click the "+ CREATE CREDENTIALS" button
3. Select "API Key"
4. A dialog will appear with your new API key
5. **Copy the API key** (you'll need this)

### 2️⃣ Configure Your Project

1. **Open `.env.local`** in the project root
2. **Paste your API key** next to `NEXT_PUBLIC_YOUTUBE_API_KEY=`
   
   Before:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=
   ```
   
   After:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyD1h5X5j-blExampleKeyHere
   ```

3. **Save the file**

### 3️⃣ Run the Project

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

The server will start and output:
```
▲ Next.js 16.2.2
- Local:         http://localhost:3000
```

### 4️⃣ Open in Browser

Visit **[http://localhost:3000](http://localhost:3000)** and start searching!

## Troubleshooting

### "YouTube API key not configured"

**Problem**: You see this error message

**Solution**:
1. Check that `.env.local` file exists in the project root
2. Verify it has `NEXT_PUBLIC_YOUTUBE_API_KEY=your_key_here`
3. **Restart the dev server** after adding the key
4. Hard refresh the browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

### "searchVideos is not a function"

**Problem**: App crashes when searching

**Solution**:
1. Make sure API key is valid
2. Check that the API key has YouTube Data API v3 enabled
3. Try a different search term

### "ECONNREFUSED" or "Network Error"

**Problem**: Can't search or load videos

**Solution**:
1. Check your internet connection
2. Ensure the dev server is still running
3. Check that no firewall is blocking localhost:3000
4. Try clearing browser cache (Ctrl+Shift+Delete)

### Search results are empty

**Problem**: Searching returns no results

**Solution**:
1. The API key might be restricted. Go back to Google Cloud Console
2. Under Credentials, click your API Key
3. Under "Restrict Key", make sure "HTTP referrers" is set to allow localhost:3000 or leave it unrestricted for development
4. Wait a minute and try again

### Can't play videos

**Problem**: Video player shows blank or error

**Solution**:
1. The video might be restricted or deleted
2. Try a different video
3. Some videos can't be embedded - try searching for different content

## Production Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variable in Vercel Dashboard:
- Key: `NEXT_PUBLIC_YOUTUBE_API_KEY`
- Value: Your API key

### Self-Hosted (Docker)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t calm-watching .
docker run -p 3000:3000 -e NEXT_PUBLIC_YOUTUBE_API_KEY=your_key calm-watching
```

## API Quotas

The YouTube Data API has daily quotas:
- **10,000 units per day** (free tier)
- Search = 100 units
- Get video details = 1 unit per video

**This means**: ~100 searches per day approximately

When you exceed the quota, you'll see an error. Reset happens at midnight UTC.

## Important Notes

⚠️ **Keep your API key private in production!**
- Don't commit `.env.local` to Git
- On production, use environment variables in your hosting platform
- The key is public-facing (NEXT_PUBLIC_*), which is fine for read-only YouTube API access

✅ **History Storage**
- All watch history is stored in browser localStorage
- Data doesn't leave your computer
- Persists across sessions
- Cleared if browser cache is cleared

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Check for lint errors
npm run lint

# Fix lint errors (if configured)
npm run lint -- --fix
```

## How to Use the App

### Search Page (`/`)
- Type your search query
- Click "Search" or press Enter
- Results load on the next page

### Results Page (`/results?q=...`)
- View clean grid of video results
- Click any video to watch
- Use "Previous" and "Next" for pagination
- No infinite scroll - no algorithm trap!

### Watch Page (`/watch?v=...`)
- Large video player
- Video is automatically added to your history
- Watch with no related videos, suggestions, or autoplay
- Read video description below player

### History Page (`/history`)
- See all videos you've watched
- Sorted with most recent first
- Click any video to rewatch
- Delete individual videos or clear entire history
- Toggle "Pause Tracking" to stop recording history temporarily

## Customization

### Change Colors
Edit `app/globals.css` to customize the color palette.

### Add Features

**Backend History Sync** (MongoDB):
```bash
npm install mongodb
```

Create `lib/mongodb.ts` and update history functions to sync to backend.

**Search Filters**:
Add filter options in SearchBar component (upload date, duration, etc.)

**Playlists**:
Add new page for creating and managing playlists

### Disable Features

**Remove History**:
- Delete `/app/history` folder
- Remove "History" link from header

**Remove Auto-Track**:
- Edit `components/VideoPlayer.tsx`
- Comment out the `addToHistory()` call

## Getting Help

Check [README.md](./README.md) for more information about:
- Project structure
- Component documentation
- Tech stack details
- Browser compatibility

---

**That's it! Enjoy intentional, distraction-free YouTube watching! 🎥**
