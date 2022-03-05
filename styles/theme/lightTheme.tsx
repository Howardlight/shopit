import {
    createTheme
} from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#C78283",            
        },
        secondary: {
            main: "#3A445D",
        }
    },
});

export default lightTheme;