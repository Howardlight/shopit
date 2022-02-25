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

import Image from "next/image";
import imageLoader from "../imageLoader";

import DeleteIcon from '@mui/icons-material/Delete';

export default function WishlistDrawer({isDrawerOpen, setIsDrawerOpen}: {isDrawerOpen: boolean, setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

    const dispatch = useAppDispatch();
    const wishlist = useAppSelector((state) => state.wishlist.content);


    return (
        <Drawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            {wishlist.map((product, index) => {
                return (
                    <>
                        <Box key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "row", maxWidth: "300px", padding: "3px" }}>
                            <Image loader={imageLoader} alt={product.title} src={product.image} unoptimized height="128" width="128" />
                            <Container>
                                <Typography variant="subtitle1">{product.title}</Typography>
                                <Box style={{ display: "flex", justifyContent: "space-evenly", flexDirection: "row", alignItems: "center" }}>
                                    <Typography variant="subtitle2">{product.category}</Typography>
                                    <IconButton><DeleteIcon /></IconButton>
                                </Box>
                            </Container>
                        </Box>
                        <Divider />
                    </>
                );
            })}
        </Drawer>
    );
};