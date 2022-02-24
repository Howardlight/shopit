import Image from "next/image";

import { useAppSelector, useAppDispatch} from "../redux/hooks";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} from "../redux/CartSlice";

// Styles
import styles from "../styles/Cart.module.css";

// Components
import Layout from "../components/Layout";
import imageLoader from "../imageLoader";



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
        <div 
        className={styles.container}
        >
            {cart.length === 0 ? (
                <h1>Your Cart is Empty!</h1>
            ) : (
                <>
                    <div 
                    className={styles.header}
                    >
                        <div>Image</div>
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Actions</div>
                        <div>Total Price</div>
                    </div>
                    {cart.map((item, index) => (
                        <div 
                        className={styles.body}
                        key={index}>
                            <div 
                            className={styles.image}
                            >
                                <Image loader={imageLoader} unoptimized src={item.image} alt={item.title} height="90" width="65" />
                            </div>
                            <p>{item.title}</p>
                            <p>$ {item.price}</p>
                            <p>{item.quantity}</p>
                            <div 
                            // className={styles.buttons}
                            >
                                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                                    +
                                </button>
                                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                                    -
                                </button>
                                <button onClick={() => dispatch(removeFromCart(item.id))}>
                                    x
                                </button>
                            </div>
                            <p>$ {item.quantity! * item.price}</p>
                        </div>
                    ))}
                    <h2>Grand Total: $ {getTotalPrice()}</h2>
                </>
            )}
        </div>
    );
};

export default CartPage;