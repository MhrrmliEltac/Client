import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import favouriteSlice from "./Slice/favouriteSlice";
import addToCart from "./Slice/addToCart";
import userSlice from "./Slice/userSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    favoriteProduct: favouriteSlice,
    addToCartProduct: addToCart,
    counter: addToCart,
    users: userSlice,
  },
});
