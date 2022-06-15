import * as React from 'react';
import {Box, Container, Drawer, IconButton, Typography,} from "@mui/material";
import Divider from "@mui/material/Divider";

import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {removeFromWishlist} from '../redux/WishlistSlice';

import Image from "next/image";
import imageLoader from "../imageLoader";
import Link from "next/link";

import DeleteIcon from '@mui/icons-material/Delete';
import Favorite from '@mui/icons-material/Favorite';

import wishlistDrawerStyles from "../styles/WishlistDrawer.module.css";

export default function WishlistDrawer({isDrawerOpen, setIsDrawerOpen}: {isDrawerOpen: boolean, setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);

    function EmptyWishlist() {
        return(
            <Box style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "15px"}}>
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
                        <Box key={index} className={wishlistDrawerStyles.wishlistItem}>
                            <Image loader={imageLoader} alt={product.title} src={product.image} unoptimized height="128" width="128" objectFit='contain' />
                            <Container className={wishlistDrawerStyles.wishlistItemTextContainer}>
                                <Link href={`/product/${product.id}`}>
                                    <a>
                                        <Typography
                                            variant="subtitle2" display={"block"}
                                            style={{overflow: "hidden"}}
                                            onClick={() => setIsDrawerOpen(false)}
                                        >
                                            {product.title}
                                        </Typography>
                                    </a>
                                </Link>
                                <Box style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    pointerEvents: "none"
                                }}>

                                    <Typography variant="subtitle2">{product.category}</Typography>

                                    <IconButton
                                        // @ts-ignore
                                        style={{pointerEvents: "bounding-box"}} // This is valid CSS i dunno why it props up on me
                                        onClick={() => dispatch(removeFromWishlist(product.id))}>
                                        <DeleteIcon color="error"/>
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