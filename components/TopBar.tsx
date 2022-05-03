import Link from "next/link";

import * as React from "react";
import {useCallback, useMemo} from "react";
import {AppBar, Badge, Box, Button, Toolbar, Typography,} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';

import {useAppSelector} from "../redux/hooks";
import {NextRouter, useRouter} from "next/router";

import styles from "../styles/TopBar.module.css";
import {Product} from "../utils/types";

export default function TopBar({setIsDrawerOpen}: {setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>} ) {

    const router = useRouter();

    // REACT REDUX
    // const cart = useAppSelector((state) => state.cart.content);
    // const wishlist = useAppSelector((state) => state.wishlist.content);


    // const getTotalCartItems = useCallback((): number => {
    //     let out: number = 0
    //     for(let i: number = 0; i < cart.length; i++) {
    //         out += cart[i].quantity!;
    //         // Quantity cannot logically be 0
    //         // as it would not have been in the cart otherwise
    //         // (Redux handles this logic, check CartSlice)
    //     }
    //
    //     return out;
    // },[cart]);

    console.log("Topbar Rerendered");


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
                    {/*<ShoppingCartButton  router={router} getTotalCartItems={getTotalCartItems}/>*/}
                </Toolbar>
            </AppBar>
      </Box>
    );
}

const WishlistButton = ({setIsDrawerOpen}: {setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    console.log("WhishlistButton Rerender");
    // NOTE: This also re-renders when it doesn't need to
    // same case as ShoppingCartButton

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

    const wishlistLength = useAppSelector((state) => state.wishlist.content.length);
    console.log("wishlistIcon re-rendered");

    return (
        <Badge badgeContent={wishlistLength == 0 ? 0 : wishlistLength} color="error">
            <FavoriteIcon/>
        </Badge>
    );
};

const ShoppingCartButton = ({router, getTotalCartItems}: {router: NextRouter, getTotalCartItems: () => number}) => {

    // console.log("ShoppingCartButton Rerender");
    //TODO: Button re-renders each time an item is added, Fix this
    // make it so only the badge re-renders
    //NOTE: It also re-renders when a wishlist item is added

    return (
        <>
            <Button
                color="inherit"
                id="composition-button"
                aria-haspopup="true"
                onClick={() => router.push("/cart")}
                endIcon={<ShoppingCartIcon getTotalCartItems={getTotalCartItems} />}
            >
                Your Cart
            </Button>
        </>
    );
};

const ShoppingCartIcon = ({getTotalCartItems}: {getTotalCartItems: () => number}) => {
    console.log("WhishlistButton Rerender");
    return (
        <Badge badgeContent={getTotalCartItems()} color="error">
            <ShoppingCart/>
        </Badge>
    );
};

