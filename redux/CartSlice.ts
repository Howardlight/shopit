import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../utils/types";
import { findProduct, findIndexOfProduct } from "./reduxHelpers";


export interface cartState {
    content: Product[];
}

const initialState: cartState = {
    content: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            let itemExists = findProduct(action.payload, state);

            // if it exists, increase its quantity
            if (itemExists) itemExists.quantity!++;

            // If it doesn't exist, add it to state
            else state.content.push({ ...action.payload, quantity: 1 });
        },
        incrementQuantity: (state, action: PayloadAction<Product>) => {
            let itemExists = findProduct(action.payload, state);

            // If item not found, throw error
            if (!itemExists) console.error(`incrementQuantity ITEM NOT FOUND`);
            else {
                // if item has no quantity throw error
                if (!itemExists.quantity) console.error(`incrementQuantity item: ${itemExists.title} has NO QUANTITY`);
                else itemExists.quantity++;

            }
        },
        decrementQuantity: (state, action: PayloadAction<Product>) => {
            let itemExists = findProduct(action.payload, state);

            // If item not found, throw error
            if (!itemExists) console.error(`decrementQuantity ITEM NOT FOUND`);
            else {

                // If quantity is 1, remove it from state
                if (itemExists.quantity === 1) {
                    let index: number = findIndexOfProduct(action.payload, state);
                    state.content.splice(index, 1);

                } else {
                    // if quantity is 0, throw error
                    if (!itemExists.quantity) console.error(`decrementQuantity item: ${itemExists.title} has NO QUANTITY`);
                    else itemExists.quantity--;

                }
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            let index: number = findIndexOfProduct(action.payload, state);

            state.content.splice(index, 1);
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart
} = cartSlice.actions;