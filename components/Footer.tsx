import {
    Typography
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {


    return(
        <Typography style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
            Created with <FavoriteIcon style={{color: "#C78283", marginLeft: "2px", marginRight: "2px"}} />by HowardLight
        </Typography>
    );
}