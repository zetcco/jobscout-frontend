import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { grey } from '@mui/material/colors';

const getDesignTokens = () => ({
  palette: {
    mode: "light",
    primary: {
      main: "#00AE2B",
      light: "#adf75a",
      dark: "#006E17",
      fade: "#d5eaba",
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
    fontFamily: "Inter",
    h5: {
        fontWeight: 700
    },
    button: {
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