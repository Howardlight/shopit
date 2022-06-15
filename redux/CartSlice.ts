import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, Product} from "../utils/types";
import {WritableDraft} from "immer/dist/types/types-external";


interface cartState {
    content: Product[];
}

const initialState: cartState = {
    content: [],
}

/**
 *
 * Checks if Product Category is of MenSClothing or WomenSClothing
 *
 * @param payload
 *
 * @returns `True` if Product is Clothing
 * @returns `False` if Product is NOT Clothing
 */
function checkIfClothing(payload: Product) {

    return payload.category == Category.MenSClothing ||
        payload.category == Category.WomenSClothing;
}


/**
 * 
 * Looks for Product inside of state and returns it
 * 
 * @param payload - The payload input which we have to find inside of state
 * @param state - The Redux State
 * 
 * @returns `Product` | `undefined`
 */
function findProduct(payload: Product, state: WritableDraft<cartState>): WritableDraft<Product> | undefined {
    let itemExists: WritableDraft<Product> | undefined;

    if(checkIfClothing(payload)) itemExists = state.content.find((item: Product) => item.id === payload.id && item.Size == payload.Size);
    else itemExists = state.content.find((item: Product) => item.id === payload.id);

    return itemExists;
}


/**
 * Looks for Index of Product inside of state and returns it
 * 
 * @param payload - The payload input which we have to find inside of state
 * @param state - The Redux State
 * @returns `number`
 */
function findIndexOfProduct(payload: Product, state: WritableDraft<cartState>): number {
    let index : number;

    if(checkIfClothing(payload)) index = state.content.findIndex((item: Product) => item.id === payload.id && item.Size == payload.Size);
    else index = state.content.findIndex((item: Product) => item.id === payload.id);

    return index;
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