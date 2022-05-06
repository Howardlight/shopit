import Image from "next/image";

import { useAppSelector, useAppDispatch} from "../redux/hooks";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} from "../redux/CartSlice";

import {
    IconButton,
    ButtonGroup,
    Container,
    Typography,
    Box
} from "@mui/material";


// Styles
import styles from "../styles/Cart.module.css";

// Components
import Layout from "../components/Layout";
import imageLoader from "../imageLoader";

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import Head from "next/head";
import React from "react";
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
                        {cart.map((item, index) => (
                            <div
                                className={styles.body}
                                key={index}>
                                <div
                                    className={styles.image}
                                >
                                    <Image loader={imageLoader} unoptimized src={item.image} alt={item.title} height="90" width="65" />
                                </div>
                                <Typography variant="subtitle2">{item.title}</Typography>
                                <Typography>$ {item.price}</Typography >
                                <Typography >{item.quantity}</Typography >
                                <ButtonGroup className={styles.mainButtonGroup}>
                                    <IconButton color="primary" onClick={() => dispatch(incrementQuantity(item.id))}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => dispatch(decrementQuantity(item.id))}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => dispatch(removeFromCart(item.id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ButtonGroup>
                                <Typography variant="subtitle2">$ {Math.round((item.quantity! * item.price) * 100) / 100}</Typography>
                            </div>
                        ))}
                        <h2>Grand Total: $ {Math.round(getTotalPrice() * 100) / 100}</h2>
                    </>
                )}
            </Container>
        </React.Fragment>
    );
};

export default CartPage;