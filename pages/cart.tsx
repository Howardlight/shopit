import {useAppDispatch, useAppSelector} from "../redux/hooks";

import {Box, ButtonGroup, Card, CardContent, CardMedia, Container, IconButton, Typography, Button} from "@mui/material";

// Styles
import styles from "../styles/Cart.module.css";

// Components
import Layout from "../components/Layout";

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import Head from "next/head";
import React, {Dispatch} from "react";
import {Product} from "../utils/types";
import {AnyAction} from "redux";
import {decrementQuantity, incrementQuantity, removeFromCart} from "../redux/CartSlice";

CartPage.getLayout = function getLayout(page: typeof CartPage) {
    return <Layout>{page}</Layout>
}

function CartPage() {

    const cart = useAppSelector((state) => state.cart.content);
    const dispatch = useAppDispatch();

    const getTotalPrice = () => {
        return cart.reduce(
        (accumulator, item) => accumulator + item.quantity! * item.price,
            0
        );
    };

    return(
        <React.Fragment>
            <Head>
                <title>My Cart - ShopIt</title>
            </Head>
            <Container
                className={styles.container}
            >
                {cart.length === 0 ? (
                    <Box style={{ minHeight: "500px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant="h3" color="primary">
                            Your Cart is Empty!
                        </Typography>
                        <br />
                        <Typography variant="h6" color="secondary">
                            Click `add to cart` to add an item to your cart
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", ml: "25px", mr: "25px"}}>
                            <Typography variant={"h5"} color="primary">Grand Total: $ {Math.round(getTotalPrice() * 100) / 100}</Typography>
                            <Button variant="outlined">Check out</Button>
                        </Box>
                        {cart.map((item, index) => (
                            <React.Fragment key={index}>
                                <CartCard product={item} dispatch={dispatch} />
                            </React.Fragment>
                        ))}
                    </>
                )}
            </Container>
        </React.Fragment>
    );
}

function CartCard({product, dispatch}: {product: Product, dispatch: Dispatch<AnyAction> }) {

    return (
        <Card sx={{height: 150, margin: "25px"}} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>

            <CardMedia
                component={"img"}

                style={{width: "auto", objectFit: "contain", padding: "5px"}}

                image={product.image}
            />


            <CardContent style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
                         sx={{flexGrow: 3}}>


                <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Typography variant={"h6"} gutterBottom>{product.title}</Typography>
                    <Typography>Item Price: {product.price}$</Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                    {product.Size ? <Typography>Size: {product.Size}</Typography> : <></>}
                </Box>


                <ButtonGroup
                    // className={styles.mainButtonGroup}
                    style={{display: "flex", flexDirection: "column"}}
                >
                    <IconButton color="primary" onClick={() => dispatch(incrementQuantity(product))}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton color="primary" onClick={() => dispatch(decrementQuantity(product))}>
                        <RemoveIcon/>
                    </IconButton>
                    <IconButton color="error" onClick={() => dispatch(removeFromCart(product))}>
                        <DeleteIcon/>
                    </IconButton>
                </ButtonGroup>
            </CardContent>

        </Card>
    )
}

export default CartPage;