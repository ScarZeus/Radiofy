"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";

export default function LoginOrSignUp() {
  const { data: session } = useSession();

  return (
    <div className={styles.page}>
      {!session ? (
        <>
          <h1>Login or Sign Up</h1>
          <button
            onClick={() => signIn("spotify")}
            className={styles.loginBtn}
          >
            Login with Spotify
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, {session.user?.name}</h1>
          <button
            onClick={() => signOut()}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
