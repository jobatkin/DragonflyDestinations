import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NavBar from "@/components/NavBar";
import { CssBaseline } from "@mui/material";
import DDThemeProvider from "@/themes/DDThemeProvider";

export const metadata: Metadata = {
  title: "Dragonfly Destinations",
  description: "Dream about and discover information for any country in the world",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <DDThemeProvider>
            <CssBaseline />
            <NavBar />
            {children}
          </DDThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
