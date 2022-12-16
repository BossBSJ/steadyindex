import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    shape:{
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
                borderRadius: '5px'
            }
        }
    }
}

export default theme