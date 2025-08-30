import "./globals.css";
import SideNavbar from './components/side_navbar';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("login-status");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <html lang="en">
      <body>
        <SideNavbar loginStatus={isLoggedIn} />
        <main style={{
          marginLeft: "200px",
          padding: "1rem"
        }}>{children}</main>
      </body>
    </html>
  );
}
