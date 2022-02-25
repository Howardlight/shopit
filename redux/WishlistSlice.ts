import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

interface wishlistState {
    content: Product[];
}

const initialState: wishlistState = {
    content: [],
}

const wishlistSlice = createSlice ({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {

            // Look for item in state
            // const itemExists = state.content.find((item: Product) => item.id === action.payload.id);

            state.content.push({ ...action.payload });
            // console.log(`addToWishlist added Item \n-  item: ${action.payload.title}`)
        },
        removeFromWishlist:(state, action) => {
            // find item
            const index = state.content.findIndex((item) => item.id === action.payload);

            // console.log(`removeFromWishlist removing item: ${index}`);

            // remove item from state
            state.content.splice(index, 1);
        },
    }
});

export const wishlistReducer = wishlistSlice.reducer;

export const {
    addToWishlist,
    removeFromWishlist
} = wishlistSlice.actions;