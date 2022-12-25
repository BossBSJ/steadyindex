import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            light: "#669FFF",
            main: "#005FFF",
            dark: "#003999"
        },
        secondary: {
            light: "#CECEFD",
            main: "#9E9EFA",
            dark: "#6D6DF8"
        },
        success: {
            main: "#86CD42"
        },
        warning: {
            main: "#F9CF52"
        },
        error: {
            main: "#EC522E"
        },
        // white: '#ffffff',
        // gray: '#82858A'
        
    },
    shape: {
        borderRadius: 5
    },
    typography: {
        fontFamily: 'Poppins',
        fontWeightBold:700,
        h1: {
            fontHeight: 400,
            fontSize: "96px",
        },
        h2: {
            fontHeight: 400,
            fontSize: "60px",
        },
        h3: {
            fontHeight: 400,
            fontSize: "48px",
        },
        h4: {
            fontHeight: 400,
            fontSize: "34px",
        },
        h5: {
            fontHeight: 400,
            fontSize: "24px",
        },
        h6: {
            fontHeight: 400,
            fontSize: "20px",
        },
        body1: {
            fontHeight: 400,
            fontSize: "16px",
        },
        body2: {
            fontHeight: 400,
            fontSize: "14px",
        },
        overline: {
            fontHeight: 400,
            fontSize: "12px",
        },
        caption: {
            fontHeight: 400,
            fontSize: "12px",
        },
    }
})

theme.components = {
    MuiButton: {
        styleOverrides: {
            root:{
                borderRadius: '9px',
                textTransform: 'none',
                height: '45px',
                // border: "1px solid"
            },
            outlined: {
                borderColor: "#627DFF",
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: "16px"
            }
        }
    }
}

export default theme