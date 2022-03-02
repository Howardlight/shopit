import * as React from 'react';
import {
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Typography,
    Box,
    Container,
    IconButton,
} from "@mui/material";

import Divider from "@mui/material/Divider";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFromWishlist } from '../redux/WishlistSlice';


import Image from "next/image";
import imageLoader from "../imageLoader";

import DeleteIcon from '@mui/icons-material/Delete';
import Favorite from '@mui/icons-material/Favorite';

export default function WishlistDrawer({isDrawerOpen, setIsDrawerOpen}: {isDrawerOpen: boolean, setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);

    function EmptyWishlist() {
        return(
            <Box style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <Favorite sx={{fontSize: 80}} style={{opacity: "0.3"}}/>
                <Typography variant="subtitle1">Your wishlist is empty</Typography>
                {/* <Typography variant="subtitle2">Try adding something to your wishlist</Typography> */}
            </Box>
        );
    }



    return (
        <Drawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            {wishlist.length == 0 ? <EmptyWishlist /> : wishlist.map((product, index) => {
                return (
                    <div key={index}>
                        <Box key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "row", maxWidth: "300px", padding: "3px" }}>
                            <Image loader={imageLoader} alt={product.title} src={product.image} unoptimized height="128" width="128" />
                            <Container>
                                <Typography variant="subtitle1">{product.title}</Typography>
                                <Box style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row", alignItems: "center" }}>
                                    <Typography variant="subtitle2">{product.category}</Typography>
                                    <IconButton
                                        onClick={() => dispatch(removeFromWishlist(product))}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Box>
                            </Container>
                        </Box>
                        <Divider />
                    </div>
                );
            })}
        </Drawer>
    );
};