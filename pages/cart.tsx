import {useAppDispatch, useAppSelector} from "../redux/hooks";

import {Box, Container, Typography, Button, Collapse, Fade} from "@mui/material";

import styles from "../styles/Cart.module.css";

import Layout from "../components/Layout";

import Head from "next/head";
import * as React from "react";

import { CartCard } from "../components/CartCard";
import { TransitionGroup } from "react-transition-group";

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
                        <TransitionGroup>
                            {cart.map((item, index) => (
                                <Collapse key={index} unmountOnExit>
                                    <CartCard product={item} dispatch={dispatch} />
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </>
                )}
            </Container>
        </React.Fragment>
    );
}

export default CartPage;