"use client";

import { useEffect, useState } from "react";

export default function SpotifyWidget() {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    // Ensure timestamp is only set on client
    const updateTimestamp = () => setTimestamp(Date.now());
    updateTimestamp();

    const interval = setInterval(updateTimestamp, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!timestamp) return null; // skip SSR render

  return (
    <a
      href="https://open.spotify.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-fit"
    >
      <img
        src={`https://spotify-widgets.vercel.app/api/spotify?ts=${timestamp}`}
        alt="Now Playing on Spotify"
        className="rounded-lg shadow-lg"
      />
    </a>
  );
}