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
        addToCart: (state, action: PayloadAction<Product>) => {

            let itemExists = null;
            //Check if item is Clothing
            if(
                action.payload.category == Category.MenSClothing ||
                action.payload.category == Category.WomenSClothing
            ) {
                // Filters by id AND size
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
        incrementQuantity: (state, action) => {

            // Look for item in state
            const item = state.content.find((item) => item.id === action.payload);

            // If item not found, throw error
            if (!item) console.error(`incrementQuantity ITEM NOT FOUND`);
            else {
                // if item has no quantity throw error
                if (!item.quantity) console.error(`incrementQuantity item: ${item.title} has NO QUANTITY`);

                // Increase quantity 
                else {
                    item.quantity++;
                    // console.log(`incrementQuantity increased Quantity \n-  item: ${item.title} \n-  quantity: ${item.quantity}`)
                }
            }
        },
        decrementQuantity: (state, action) => {

            // Look for item in state
            const item = state.content.find((item) => item.id === action.payload);

            // If item not found, throw error
            if (!item) console.error(`decrementQuantity ITEM NOT FOUND`);

            else {

                // If quantity is 1, remove it from state
                if (item.quantity === 1) {
                    // console.log(`decrementQuantity item quantity was 1 -  removing item: ${item.title}`)

                    const index = state.content.findIndex((item) => item.id === action.payload);
                    state.content.splice(index, 1);


                } else {

                    // if quantity is 0, throw error
                    if (!item.quantity) console.error(`decrementQuantity item: ${item.title} has NO QUANTITY`);


                    else {
                        // decrease quantity
                        item.quantity--;
                        // console.log(`decrementQuantity decreased Quantity \n-  item: ${item} \n-  quantity: ${item.quantity}`)
                    }
                }
            }
        },
        removeFromCart: (state, action) => {
            // find item
            const index = state.content.findIndex((item) => item.id === action.payload);

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