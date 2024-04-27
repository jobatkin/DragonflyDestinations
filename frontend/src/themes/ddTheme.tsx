'use client';
import { createTheme } from "@mui/material/styles";
import { Gluten, Montserrat } from "next/font/google";

const gluten = Gluten({ subsets: ["latin"] }); // headings
const montserrat = Montserrat({ subsets: ["latin"] }); // body

export const ddThemeSettings = {
    palette: {
        primary: {
            main: '#5B9A8B', // teal
            light: '#93b1a6',
            contrastText: '#d8d8d8'
        },
        secondary: {
            main: '#c69749', // gold
            dark: '#735F32',
            contrastText: '#333333'
        },
        mode: 'dark' as const // dark mode by default
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
        fontSize: 16,
        h1: {
            fontSize: 34,
            fontFamily: gluten.style.fontFamily,
        },
        h2: {
            fontSize: 30,
            fontFamily: gluten.style.fontFamily,
        },
        h3: {
            fontSize: 26,
            fontFamily: gluten.style.fontFamily,
        },
        h4: {
            fontSize: 22,
            fontFamily: gluten.style.fontFamily,
        },
        h5: {
            fontSize: 18,
            fontFamily: gluten.style.fontFamily,
        }                                   
    },
    shape: {
        borderRadius: 10
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
              a {
                color: #5B9A8B;
              }
            `,
        },        
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            } as const,
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled'
            } as const
        }
    }    
};

export const ddTheme = createTheme(ddThemeSettings);
