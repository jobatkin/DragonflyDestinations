import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// const NavBar = dynamic( () => import('@/components/NavBar'), { ssr: false } );
import NavBar from "@/components/NavBar";
import { CssBaseline } from "@mui/material";
import DDThemeProvider from "@/themes/DDThemeProvider";
import { UserProvider } from "@/context/UserContext";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Dragonfly Destinations",
  description: "Dream about and discover information for any country in the world",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <UserProvider>
            <DDThemeProvider>
              <CssBaseline />
              <NavBar />
              {children}
            </DDThemeProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
