import { Box, ButtonGroup, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { Dispatch } from "react";
import { Product } from "../utils/types";
import { AnyAction } from "redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartSlice";

export function CartCard({ product, dispatch }: { product: Product; dispatch: Dispatch<AnyAction>; }) {

    return (
        <Card sx={{ height: 150, margin: "25px" }} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>

            <CardMedia
                component={"img"}

                style={{ width: "auto", objectFit: "contain", padding: "5px" }}

                image={product.image} />


            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                sx={{ flexGrow: 3 }}>


                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <Typography variant={"h6"} gutterBottom>{product.title}</Typography>
                    <Typography>Item Price: {product.price}$</Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                    {product.Size ? <Typography>Size: {product.Size}</Typography> : <></>}
                </Box>


                <ButtonGroup
                    // className={styles.mainButtonGroup}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <IconButton color="primary" onClick={() => dispatch(incrementQuantity(product))}>
                        <AddIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => dispatch(decrementQuantity(product))}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => dispatch(removeFromCart(product))}>
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            </CardContent>

        </Card>
    );
}
