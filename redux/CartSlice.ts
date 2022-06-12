import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category, Product} from "../utils/types";


interface cartState {
    content: Product[];
}

const initialState: cartState = {
    content: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //TODO: Use EsDocs to explain this
        //TODO: Simplify this using functions, if possible
        addToCart: (state, action: PayloadAction<Product>) => {

            let itemExists = null;
            //Check if item is Clothing
            if(
                action.payload.category == Category.MenSClothing ||
                action.payload.category == Category.WomenSClothing
            ) {
                itemExists = state.content.find((item: Product) => item.id === action.payload.id && item.Size == action.payload.Size);
            } else {
                // Filters by id ONLY
                itemExists = state.content.find((item: Product) => item.id === action.payload.id);
            }

            // if it exists, increase its quantity
            if (itemExists) {
                itemExists.quantity!++; // NOTE: ! Assertion here
                // console.log(`addToCart increased Quantity \n-  item: ${itemExists.title} \n-  quantity: ${itemExists.quantity}`)

                // If it doesn't exist, add it to state
            } else {
                state.content.push({ ...action.payload, quantity: 1 });
                // console.log(`addToCart added Item \n-  item: ${action.payload.title} \n-  quantity: ${action.payload.quantity}`)
            }
        },
        //TODO: Update this for Size Elements and categories
        incrementQuantity: (state, action: PayloadAction<Product>) => {

            let itemExists = null;
            // Look for item is Clothing
            if(
                action.payload.category == Category.MenSClothing ||
                action.payload.category == Category.WomenSClothing
            ) {
                // Filters by id AND size
                itemExists = state.content.find((item: Product) => item.id === action.payload.id && item.Size == action.payload.Size && item.category === action.payload.category);
            } else {
                // Filters by id ONLY
                itemExists = state.content.find((item: Product) => item.id === action.payload.id);
            }

            // If item not found, throw error
            if (!itemExists) console.error(`incrementQuantity ITEM NOT FOUND`);
            else {
                // if item has no quantity throw error
                if (!itemExists.quantity) console.error(`incrementQuantity item: ${itemExists.title} has NO QUANTITY`);

                // Increase quantity 
                else {
                    itemExists.quantity++;
                    // console.log(`incrementQuantity increased Quantity \n-  item: ${item.title} \n-  quantity: ${item.quantity}`)
                }
            }
        },
        decrementQuantity: (state, action: PayloadAction<Product>) => {

            let itemExists = null;
            let isClothing = false;
            //Check if item is Clothing
            if(
                action.payload.category == Category.MenSClothing ||
                action.payload.category == Category.WomenSClothing
            ) {
                itemExists = state.content.find((item: Product) => item.id === action.payload.id && item.Size == action.payload.Size && item.category === action.payload.category);
                isClothing = true;
            } else {
                // Filters by id ONLY
                itemExists = state.content.find((item: Product) => item.id === action.payload.id);
            }

            // If item not found, throw error
            if (!itemExists) console.error(`decrementQuantity ITEM NOT FOUND`);

            else {

                // If quantity is 1, remove it from state
                if (itemExists.quantity === 1) {
                    // console.log(`decrementQuantity item quantity was 1 -  removing item: ${item.title}`)
                    let index: number;

                    // Find Item then remove it
                    if(isClothing) index = state.content.findIndex((item) => item.id === action.payload.id && item.Size === action.payload.Size && item.category === action.payload.category);
                    else index = state.content.findIndex((item) => item.id === action.payload.id);


                    state.content.splice(index, 1);

                } else {

                    // if quantity is 0, throw error
                    if (!itemExists.quantity) console.error(`decrementQuantity item: ${itemExists.title} has NO QUANTITY`);


                    else {
                        // decrease quantity
                        itemExists.quantity--;
                        // console.log(`decrementQuantity decreased Quantity \n-  item: ${item} \n-  quantity: ${item.quantity}`)
                    }
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            // find item
            // const index = state.content.findIndex((item) => item.id === action.payload.id);
            let index: number;
            // let isClothing = false;
            //Check if item is Clothing
            if(
                action.payload.category == Category.MenSClothing ||
                action.payload.category == Category.WomenSClothing
            ) {
                index = state.content.findIndex((item: Product) => item.id === action.payload.id && item.Size == action.payload.Size && item.category === action.payload.category);
                // isClothing = true;
            } else {
                // Filters by id ONLY
                index = state.content.findIndex((item: Product) => item.id === action.payload.id);
            }

            // console.log(`removeFromCart removing item: ${index}`);

            // remove item from state
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