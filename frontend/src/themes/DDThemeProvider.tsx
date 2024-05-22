'use client';

import { ThemeProvider } from "@mui/material";
import { ddTheme } from "./ddTheme";

// Wrapper for the MUI ThemeProvider component using the DD theme, as a client component using the 'use client' directive
export default function DDThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <ThemeProvider theme={ddTheme}>
            {children}
        </ThemeProvider>
    )
}