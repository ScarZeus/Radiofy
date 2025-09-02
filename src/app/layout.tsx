import SideNavbar from "@/components/side_navbar";
import "./globals.css";
import Providers from "@/providers/next_auth_providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
        <SideNavbar  />
        <main style={{
          marginLeft: "255px",
          padding: "1rem"
        }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
