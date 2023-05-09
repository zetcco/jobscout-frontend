import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { grey } from '@mui/material/colors';

const primary = "#00AE2B"


const getDesignTokens = (theme) => ({
  palette: {
    mode: "light",
    primary: {
      main: primary,
      light: "#adf75a",
      dark: "#006E17",
      fade: "#d5eaba",
      fader: "#edf7df",
    },
    success: {
      main: primary
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  },
  shape: {
    borderRadius: 100,
  },
  shadows: [ 
    ...theme.shadows, 
    '0px 5px 14px 2px rgba(0,0,0,0.13)'
  ],
  typography: {
    fontFamily: "\"Inter\", \"Roboto\", \"sans-serif\"",
    h5: {
        fontWeight: 700
    },
    h6_bold: {
      ...( theme.typography.h6 ),
      fontWeight: 800
    },
    profile_name: {
      [theme.breakpoints.up('xs')]: {
        fontSize: "1.3rem",
        fontWeight: 700
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "2.125rem",
        fontWeight: 600
      }
    },
    button: {
        fontWeight: 600
    },
    body3: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '20px'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px'
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: '20px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 30
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '20px'
        }
      }
    },
  },
});

export const RootLayout = () => {
    const defaultTheme = createTheme();
    let theme = responsiveFontSizes(createTheme(getDesignTokens(defaultTheme)))

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Outlet/>
        </ThemeProvider>
    )
}