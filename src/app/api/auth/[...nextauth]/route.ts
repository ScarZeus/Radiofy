import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { cookies } from "next/headers";

// Extend Session type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const authorizationUrl = 
  "https://accounts.spotify.com/authorize?scope=" +
  [
    // 🔹 Images
    "ugc-image-upload",

    // 🔹 Playback & Connect
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",

    // 🔹 Playlists
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",

    // 🔹 Follow
    "user-follow-modify",
    "user-follow-read",

    // 🔹 Listening History & Recommendations
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",

    // 🔹 Library
    "user-library-read",
    "user-library-modify",

    // 🔹 User Profile
    "user-read-email",
    "user-read-private",

    // 🔹 Open Access (Partner-only scopes)
    "user-soa-link",
    "soa-manage-entitlements",
    "soa-manage-partner",
    "soa-create-partner",
    "user-soa-unlink",
  ].join("%20"); // space-separated (URL encoded)


// Helper to refresh token
async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: authorizationUrl,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account }) {
      // Initial login
      if (account) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token,
        };
      }

      // If the token is still valid, return it
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Otherwise, refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      // ✅ Save Spotify access token in cookies too
      (await cookies()).set("spotify-access-token", session.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600, // 1 hour
      });

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
