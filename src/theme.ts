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
        gradient: {
            primary: "linear-gradient(99.29deg, #004FD0 -23.14%, #3280FF 32.47%, #5E7DFF 79.6%, #7A7AFF 122.55%)",
            secondary: "linear-gradient(282.09deg, #BDD5FE -68.96%, #3636F9 155.77%)"
        }
        
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
                
            },
            outlined: {
                borderColor: "linear-gradient(99.29deg, #004FD0 -23.14%, #3280FF 32.47%, #5E7DFF 79.6%, #7A7AFF 122.55%)",
            },
            text: {
                background:"white",
                color:"#82858A",
                width:"130px"
            },
            contained: {
                background: "linear-gradient(99.29deg, #004FD0 -23.14%, #3280FF 32.47%, #5E7DFF 79.6%, #7A7AFF 122.55%)",
                "&:hover": {
                    background: "linear-gradient(99.29deg, #2A5BDF -23.14%, #2A5BDF 32.47%, #2A5BDF 79.6%, #2A5BDF 122.55%)",
                    boxShadow: "0px 19px 15px rgba(20, 25, 39, 0.1)"
                },
                "&.Mui-disabled": {
                    background: "#E9E9F0",
                    color: "#A0A5B6"
                }
            },
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: "16px",
                boxShadow:"none"
            }
        }
    },
    MuiTextField: {
        styleOverrides:{
            root: {
                backgroundColor:"white",
                "& fieldset": { border: 'none' },
                borderRadius:"8px",
                
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: "16px"
            }
        }
    },
    MuiLinearProgress: {
        styleOverrides: {
            root: {
                height:"13px",
                borderRadius:"11px"
            }
        }
    },
}

export default theme