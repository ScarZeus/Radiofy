import "./globals.css";
import SideNavbar from './components/side_navbar';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <SideNavbar  />
        <main style={{
          marginLeft: "200px",
          padding: "1rem"
        }}>{children}</main>
      </body>
    </html>
  );
}
