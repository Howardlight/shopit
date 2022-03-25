import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import { wishlistReducer } from "./WishlistSlice";

const reducer = {
    cart: cartReducer,
    wishlist: wishlistReducer,
};

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;