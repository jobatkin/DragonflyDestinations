'use client';
import { gluten, montserrat } from "@/app/fonts";
import { PaletteColorOptions, PaletteColor, createTheme, alpha, ButtonProps, Theme } from "@mui/material";

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
            contrastText: '#222222' // dark grey
        },
        info: {
            main: '#252b48', // navy
            contrastText: '#e8e8e8' // light grey
        },
        extra: {
            main: '#445069', // light navy
            light: alpha('#445069', 0.5),
            dark: alpha('#34425B', 0.9),
            contrastText: '#e8e8e8' // light grey
        },        
        mode: 'dark' as const // dark mode by default
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
        htmlFontSize: 16,
        h1: {
            fontSize: 36,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h2: {
            fontSize: 32,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h3: {
            fontSize: 28,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h4: {
            fontSize: 24,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        },
        h5: {
            fontSize: 20,
            fontWeight: 500,
            fontFamily: gluten.style.fontFamily,
        }                                   
    },
    shape: {
        borderRadius: 10
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `a { color: #5B9A8B; }`,
        },        
        MuiButton: {
            defaultProps: { variant: 'contained' } as const,
            styleOverrides: {
                root: ({ ownerState, theme }: { ownerState: ButtonProps, theme: Theme }) => ({
                    // disabled buttons don't change colour. see https://mui.com/blog/callback-support-in-style-overrides/
                    '&.MuiButton-contained.Mui-disabled': {
                        backgroundColor: ownerState.color && ownerState.color !== 'inherit' ? theme.palette[ownerState.color].main : '',
                        color: ownerState.color && ownerState.color !== 'inherit' ? theme.palette[ownerState.color].contrastText : '',
                    }
                }),
            }
        },
        MuiTextField: {
            defaultProps: { variant: 'filled' } as const
        }
    }    
};

export const ddTheme = createTheme(ddThemeSettings);
