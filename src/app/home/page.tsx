export default async function Home() {

  return (
    <div>
      <h1>🎶 Your Top Spotify Tracks</h1>
      <ul>
        {/* {data.items?.map((track: any) => (
          <li key={track.id}>
            {track.name} — {track.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
