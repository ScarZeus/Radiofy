import { cookies } from "next/headers";
import styles from "./page.module.css";

export default async function Home() {
  const token = (await cookies()).get("spotify-access-token")?.value;

  let topTracks: any[] = [];

  if (token) {
    try {
      const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        topTracks = data.items;
      } else {
        console.error("Failed to fetch top tracks:", await res.json());
      }
    } catch (err) {
      console.error("Error fetching top tracks:", err);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎶 Your Top Spotify Tracks</h1>

      {topTracks.length === 0 ? (
        <p className={styles.empty}>No tracks found. Try logging in again!</p>
      ) : (
        <ul className={styles.grid}>
          {topTracks.map((track: any) => (
            <li key={track.id} className={styles.card}>
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className={styles.albumArt}
              />
              <h2 className={styles.trackName}>{track.name}</h2>
              <p className={styles.artist}>
                {track.artists.map((a: any) => a.name).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
