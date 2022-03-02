
import { 
    addToWishlist,
    removeFromWishlist, 
} from "../redux/WishlistSlice";

import { 
    useAppDispatch,
    useAppSelector
} from "../redux/hooks";

import { Product } from "../types";

/**
 * Checks if passed Product is inside of wishlist State
 * 
 * if Product is inside wishlist, returns TRUE
 * 
 * else returns FALSE
 * @param product 
 * @param wishlist 
 * @returns boolean
 */
export function checkIfInWishlist(product: Product, wishlist: Product[]): boolean {

    // Loops over wishlist state and checks if id matches
    for (let i: number = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === product.id) return true;
    };

    // if it doesn't match return false
    return false;
};
