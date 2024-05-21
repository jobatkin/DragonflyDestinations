'use client';
import { gluten, montserrat } from "@/app/fonts";
import { PaletteColorOptions, PaletteColor, createTheme, alpha } from "@mui/material";

// augmentation (see https://mui.com/material-ui/customization/palette/#typescript) to add support for custom colours in TypeScript
declare module '@mui/material/styles' {
    interface Palette {
      extra: PaletteColor;
    }
  
    interface PaletteOptions {
      extra?: PaletteColorOptions;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        extra: true;
    }
}

export const ddThemeSettings = {
    palette: {
        primary: {
            main: '#5B9A8B', // teal
            light: '#93b1a6', // light teal
            contrastText: '#f8f8f8' // almost white
        },
        secondary: {
            main: '#c69749', // gold
            dark: '#735F32', // dark gold
            contrastText: '#333333' // dark grey
        },
        info: {
            main: '#252b48', // navy
            contrastText: '#e8e8e8' // light grey
        },
        extra: {
            main: '#445069', // light navy
            light: alpha('#445069', 0.5),
            dark: alpha('#445069', 0.9),
            contrastText: '#e8e8e8' // light grey
        },        
        mode: 'dark' as const // dark mode by default
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
        fontSize: 16,
        h1: {
            fontSize: 34,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h2: {
            fontSize: 30,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h3: {
            fontSize: 26,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h4: {
            fontSize: 22,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h5: {
            fontSize: 18,
            fontWeight: 500,
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