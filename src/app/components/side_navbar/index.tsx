'use client'
import Link from "next/link";
import styles from "./index.module.css";

export default function SideNavbar({ loginStatus }: { loginStatus: boolean }) {
  return (
    <nav
      style={{
        width: "200px",
        background: "#1e293b",
        color: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
      }}
    >
      <Link href='/' className='nav-link'>Home</Link>
      <Link href='/favorites' className='nav-link'>Favorites</Link>
      <Link href='/history' className='nav-link'>History</Link>
      <div className={styles.userSection}>
        {loginStatus ? (
          <>
            <Link href='/profile' className='nav-link'>Profile</Link>
          </>
        ) : (
          <>
            <Link href='/login_sign_up' className='nav-link'>Login / Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
