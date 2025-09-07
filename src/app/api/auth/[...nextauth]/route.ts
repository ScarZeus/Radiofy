import { User } from "@/lib/types/user";
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
    "user-library-read",      
  "user-library-modify",    
  "playlist-read-private",  
  "playlist-read-collaborative" 
  ].join("%20");

var currentUser: User = {
  id:'',
  name:'',
  email:'',
  image:''
}
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
    async jwt({ token, user, account, profile}) {
      // Initial login
      
      if (account) {
        currentUser.id = user.id;
        currentUser.name = user.name || '';
        currentUser.email = user.email || '';
        currentUser.image = user.image || '';
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

    async session({ session, user,token }) {
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.name = currentUser.name || '';
        session.user.email = currentUser.email || '';
        session.user.image = currentUser.image || '';
      }
      console.log("USER", user);

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
