import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary:{
            main:"#fff"
        },
        secondary: {
            main: "#25736b"
        },
        error: {
            main: red.A400
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: "#4a148c",
                    
                }
            },
        }
    }
})