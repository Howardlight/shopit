import Link from "next/link";

import * as React from "react";
import {
    Typography,
    Button,
    Box,
    Toolbar,
    IconButton,
    AppBar,
    Badge,
    ClickAwayListener,
    Popper,
    Grow,
    Paper,
    MenuList,
    MenuItem,
} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useAppSelector } from "../redux/hooks";
import { useCallback } from "react";
import { useRouter } from "next/router";

import styles from "../styles/TopBar.module.css";

export default function TopBar({setIsDrawerOpen}: {setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>} ) {

    const router = useRouter();


    // CART BUTTON LOGIC
    // const [open, setOpen] = React.useState(false);
    // const anchorRef = React.useRef<HTMLButtonElement>(null);

    // const handleToggle = () => {
    //     setOpen((prevOpen) => !prevOpen);
    // };

    // const handleClose = (event: Event | React.SyntheticEvent) => {
    //     if (
    //     anchorRef.current &&
    //     anchorRef.current.contains(event.target as HTMLElement)
    //     ) {
    //     return;
    //     }

    //     setOpen(false);
    // };

    // function handleListKeyDown(event: React.KeyboardEvent) {
    //     if (event.key === 'Tab') {
    //     event.preventDefault();
    //     setOpen(false);
    //     } else if (event.key === 'Escape') {
    //     setOpen(false);
    //     }
    // }

    // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //     anchorRef.current!.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);


    // REACT REDUX
    const cart = useAppSelector((state) => state.cart.content);
    const wishlist = useAppSelector((state) => state.wishlist.content);


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


    // React.useEffect(() => {
    //     getTotalCartItems();
    //     console.log(`useEffect | NEW RENDER`);
    // }, [cart, getTotalCartItems])

    // ICONS
    const ShoppingCartIcon = () => {
        return (
            <Badge badgeContent={getTotalCartItems()} color="error">
                <ShoppingCart />
            </Badge>
        );
    };
    const WishlistIcon = () => {
        return (
            <Badge badgeContent={wishlist.length == 0 ? 0 : wishlist.length} color="error">
                <FavoriteIcon />
            </Badge>
        );
    };

    const WishlistButton = () => {
        // console.log("WhishlistButton Rerender");
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
    const ShoppingCartButton = () => {

        // console.log("ShoppingCartButton Rerender");
        //TODO: Button re-renders each time an item is added, Fix this
        // make it so only the badge re-renders
        //NOTE: It also re-renders when a wishlist item is added

        return (
            <>
                <Button
                    color="inherit"
                    // ref={anchorRef}
                    id="composition-button"
                    // aria-controls={open ? "composition-menu" : undefined}
                    // aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={() => router.push("/cart")}
                    endIcon={<ShoppingCartIcon />}
                >
                    Your Cart
                </Button>
                {/* <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    style={{ zIndex: "1" }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link href={"/cart"}>
                                                <a>
                                                    Go to Cart
                                                </a>
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper> */}
            </>
        );
    };

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
                    <WishlistButton />
                    <ShoppingCartButton />
                </Toolbar>
            </AppBar>
      </Box>
    );
}