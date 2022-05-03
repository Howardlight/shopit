import {useAppSelector} from "../../redux/hooks";
import {useCallback} from "react";
import {Badge, Button} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {useRouter} from "next/router";

export const ShoppingCartButton = () => {

    // Next Router to re-route to /cart
    const router = useRouter();
    return (
        <>
            <Button
                color="inherit"
                id="composition-button"
                aria-haspopup="true"
                onClick={() => router.push("/cart")}
                endIcon={<ShoppingCartIcon/>}
            >
                Your Cart
            </Button>
        </>
    );
};
const ShoppingCartIcon = () => {

    // Grabs cart from Redux state
    const cart = useAppSelector((state) => state.cart.content);
    const getTotalCartItems = useCallback((): number => {
        let out: number = 0
        for (let i: number = 0; i < cart.length; i++) {
            out += cart[i].quantity!;
            // Quantity cannot logically be 0
            // as it would not have been in the cart otherwise
            // (Redux handles this logic, check CartSlice)
        }

        return out;
    }, [cart]);

    return (
        <Badge badgeContent={getTotalCartItems()} color="error">
            <ShoppingCart/>
        </Badge>
    );
};