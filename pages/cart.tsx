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
    Typography
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

    // TODO: Round the Total of all items
    // Would look Nicer
    
    return(
        <Container
        className={styles.container}
        >
            {cart.length === 0 ? (
                <Typography variant="h3">Your Cart is Empty!</Typography>
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
                            <ButtonGroup style={{display: "flex", justifyContent: "space-evenly"}}>
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
                            <Typography variant="subtitle2">$ {item.quantity! * item.price}</Typography>
                        </div>
                    ))}
                    <h2>Grand Total: $ {getTotalPrice()}</h2>
                </>
            )}
        </Container>
    );
};

export default CartPage;