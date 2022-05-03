import Link from "next/link";
import {Dispatch, SetStateAction, useCallback} from "react";
import {AppBar, Badge, Box, Button, Toolbar, Typography,} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useAppSelector} from "../redux/hooks";
import {useRouter} from "next/router";
import styles from "../styles/TopBar.module.css";

export default function TopBar({setIsDrawerOpen}: {setIsDrawerOpen: Dispatch<SetStateAction<boolean>>} ) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{backgroundColor: "#F3D9DC", color: "#C78283"}}>
                <Toolbar>
                    <Typography 
                        variant="h6"
                        component="div"
                        color="inherit"
                        sx={{ flexGrow: 1 }} 
                        className={styles.shopItHomeScreen}
                    >
                        <Link href="/">
                            <a>
                                ShopIt
                            </a>
                        </Link>
                    </Typography>
                    <WishlistButton setIsDrawerOpen={setIsDrawerOpen} />
                    <ShoppingCartButton />
                </Toolbar>
            </AppBar>
      </Box>
    );
}

const WishlistButton = ({setIsDrawerOpen}: {setIsDrawerOpen: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <Button
            color="inherit"
            endIcon={<WishlistIcon />}
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

const ShoppingCartButton = () => {

    // Next Router to re-route to /cart
    const router = useRouter();
    return (
        <>
            <Button
                color="inherit"
                id="composition-button"
                aria-haspopup="true"
                onClick={() => router.push("/cart")}
                endIcon={<ShoppingCartIcon />}
            >
                Your Cart
            </Button>
        </>
    );
};

const ShoppingCartIcon = () => {

    // Grabs cart from Redux state
    const cart = useAppSelector((state) => state.cart.content);
    const getTotalCartItems = useCallback((): number => {
        let out: number = 0
        for(let i: number = 0; i < cart.length; i++) {
            out += cart[i].quantity!;
            // Quantity cannot logically be 0
            // as it would not have been in the cart otherwise
            // (Redux handles this logic, check CartSlice)
        }

        return out;
    },[cart]);

    return (
        <Badge badgeContent={getTotalCartItems()} color="error">
            <ShoppingCart/>
        </Badge>
    );
};

