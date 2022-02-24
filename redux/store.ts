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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;