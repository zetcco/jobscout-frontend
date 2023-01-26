import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { grey } from '@mui/material/colors';

const primary = "#00AE2B"

const getDesignTokens = () => ({
  palette: {
    mode: "light",
    primary: {
      main: primary,
      light: "#adf75a",
      dark: "#006E17",
      fade: "#d5eaba",
    },
    success: {
      main: primary
    },
    background: {
      default: "#fff",
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
  shadows: Array.from({ length: 24 }, (_, i) => "none"),
  typography: {
    fontFamily: "\"Inter\", \"Roboto\", \"sans-serif\"",
    h5: {
        fontWeight: 700
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
        disableRipple: true
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '20px'
        }
      }
    }
  },
});

export const RootLayout = () => {
    let theme = responsiveFontSizes(createTheme(getDesignTokens()))

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Outlet/>
        </ThemeProvider>
    )
}