import {useAppSelector} from "../../redux/hooks";
import {Badge, Button} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Dispatch, SetStateAction} from "react";

export const WishlistButton = ({setIsDrawerOpen}: { setIsDrawerOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <Button
            color="inherit"
            endIcon={<WishlistIcon/>}
            onClick={() => setIsDrawerOpen(true)}
        >
            Wishlist
        </Button>
    );
}
const WishlistIcon = () => {

    // Grabs length of wishlist
    const wishlistLength = useAppSelector((state) => state.wishlist.content.length);
    return (
        <Badge badgeContent={wishlistLength == 0 ? 0 : wishlistLength} color="error">
            <FavoriteIcon/>
        </Badge>
    );
};