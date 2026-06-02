/**
 * Vercel Serverless Function — /api/now-playing
 * Uses Last.fm API (completely free, no Premium needed).
 *
 * Setup (5 minutes):
 * 1. Create a free Last.fm account at https://www.last.fm
 * 2. Get a free API key at https://www.last.fm/api/account/create
 * 3. Connect your music app to Last.fm scrobbling:
 *    - Spotify: last.fm/settings/applications → "Connect Spotify"
 *    - YouTube Music: use "Last.fm Scrobbler" Chrome extension
 * 4. Add to Vercel → Settings → Environment Variables:
 *    LASTFM_API_KEY   = your_api_key
 *    LASTFM_USERNAME  = your_lastfm_username
 */

const LASTFM_BASE = "https://ws.audioscrobbler.com/2.0/";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return res.status(200).json({ isPlaying: false, configured: false });
  }

  try {
    const url = `${LASTFM_BASE}?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
    const response = await fetch(url);
    const data = await response.json();

    const tracks = data?.recenttracks?.track;
    if (!tracks || tracks.length === 0) {
      return res.status(200).json({ isPlaying: false, configured: true });
    }

    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    const isPlaying = track?.["@attr"]?.nowplaying === "true";

    // Pick largest album art image
    const images = track?.image ?? [];
    const albumArt =
      images.find((i) => i.size === "large")?.["#text"] ||
      images.find((i) => i.size === "medium")?.["#text"] ||
      null;

    return res.status(200).json({
      isPlaying,
      configured: true,
      title: track?.name ?? "Unknown Track",
      artist: track?.artist?.["#text"] ?? "Unknown Artist",
      album: track?.album?.["#text"] ?? "",
      albumArt: albumArt || null,
      songUrl: track?.url ?? null,
    });
  } catch (err) {
    console.error("Last.fm API error:", err);
    return res.status(200).json({ isPlaying: false, configured: false });
  }
}
