import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteProduct: [],
};

const favouriteProductSlice = createSlice({
  name: "favouriteProduct",
  initialState,
  reducers: {
    addFavoriteProduct: (state, action) => {
      const productExists = state.favouriteProduct.find(
        (product) => product.id === action.payload.id
      );
      if (!productExists) {
        state.favouriteProduct.push(action.payload);
      }
    },
    deleteFavoriteProduct: (state, action) => {
      state.favouriteProduct = state.favouriteProduct.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addFavoriteProduct, deleteFavoriteProduct } =
  favouriteProductSlice.actions;
export default favouriteProductSlice.reducer;
