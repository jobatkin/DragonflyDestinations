'use client';
import { gluten, montserrat } from "@/app/fonts";
import { PaletteColorOptions, PaletteColor, createTheme, alpha, ButtonProps, Theme } from "@mui/material";

// augmentation (see https://mui.com/material-ui/customization/palette/#typescript) to add support for custom colours in TypeScript
declare module '@mui/material/styles' {
    interface Palette {
      extra: PaletteColor;
      silver: PaletteColor;
    }
  
    interface PaletteOptions {
      extra?: PaletteColorOptions;
      silver?: PaletteColorOptions;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        extra: true;
        silver: true;
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        extra: true;
        silver: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsColorOverrides {
        extra: true;
        silver: true;
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
            main: '#424E7F', // light navy
            light: '#4F5E99',
            dark: '#353E66',
            contrastText: '#e8e8e8' // light grey
        },     
        silver: {
            main: '#d2d9db', // silver
            contrastText: '#222222' // dark grey
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
        },
        MuiAlert: {
            styleOverrides: {
              filledSuccess: {
                backgroundColor: '#5B9A8B', // teal green
                color: 'white'
              },
              filledError: {
                backgroundColor: '#735F32', // dark gold
                color: 'white'
              },
              filledWarning: {
                backgroundColor: '#c69749', // gold
                color: 'black'
              },
              filledInfo: {
                backgroundColor: '#252b48', // navy
                color: 'white'
              }
            }
        },        
    }    
};

export const ddTheme = createTheme(ddThemeSettings);
