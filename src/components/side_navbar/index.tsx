'use client'
import Link from "next/link";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Clock, DoorOpen, Heart, Home, Radio, Search, User } from "lucide-react";
import Image from "next/image";
export default function SideNavbar() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("login-status");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <nav
      style={{
        width: "250px",
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
      <div style={
          {
            display:"flex",
            alignItems:"center",
            gap:"0.5rem",
            color:"white",
            textDecoration:"none",
            paddingLeft:"0.5rem",
            fontSize:"2.5rem",
          }
        }>
        <Image
        src="/Radiofy-logo.svg"
        alt="Radiofy Logo"
        width={40}
        height={40}
      />
        <Link href='/' className={styles['nav-link']}>Radiofy</Link>
      </div>
      <div className={styles['icon-wrapper']}>
        <Home/>
        <Link href='/' className={styles['nav-link']}>Home</Link>
      </div>

      <div className={styles['icon-wrapper']}>
        <Heart/>
       <Link href='/favorites' className={styles['nav-link']}>Favorites</Link>
      </div>
      <div className={styles['icon-wrapper']}>
        <Search/>
        <Link href='/search' className={styles['nav-link']}>Search</Link>
      </div>
      <div className={styles['icon-wrapper']}>
        <Clock/>
        <Link href='/history' className={styles['nav-link']}>History</Link>
      </div>
      
     
      
      <div className={styles.userSection}>
        {isLoggedIn ? (
          <div className={styles['icon-wrapper']}>
            <User/>
            <Link href='/profile' className={styles['profile-link']}>Profile</Link>
          </div>
        ) : (
          <div className={styles['icon-wrapper']}>
            <DoorOpen/>
            <Link href='/login_sign_up' className={styles['nav-link']}>
            Login / Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
