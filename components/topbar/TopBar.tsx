import Link from "next/link";
import {Dispatch, SetStateAction} from "react";
import {AppBar, Box, Toolbar, Typography,} from "@mui/material";
import styles from "../../styles/TopBar.module.css";
import {WishlistButton} from "./WishlistButton";
import {ShoppingCartButton} from "./ShoppingCartButton";

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
