import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCartProduct: [],
  value: 0,
  counter: 0,
};

const addToCartProductSlice = createSlice({
  name: "addToCartProduct",
  initialState,
  reducers: {
    addToCartProducts: (state, action) => {
      const product = state.addToCartProduct.find(
        (product) => product.id === action.payload.id
      );

      if (product) {
        product.quantity += 1;
        product.totalPrice =
          Math.round((product.totalPrice + action.payload.price) * 100) / 100;
      } else {
        state.addToCartProduct.push({
          ...action.payload,
          quantity: 1,
          totalPrice: Math.round(action.payload.price * 100) / 100,
        });
      }
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    deleteProduct: (state, action) => {
      const productToRemove = state.addToCartProduct.find(
        (product) => product.id === action.payload
      );
      if (productToRemove) {
        state.value -= productToRemove.quantity;
        state.addToCartProduct = state.addToCartProduct.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    addToCartProductDetail: (state, action) => {
      const product = state.addToCartProduct.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.quantity += state.counter;
        product.totalPrice =
          Math.round((product.totalPrice + action.payload.price) * 100) / 100;
      } else if (state.counter > 0) {
        state.addToCartProduct.push({
          ...action.payload,
          quantity: state.counter,
          totalPrice: Math.round(action.payload.price * 100) / 100,
        });
      }
      if (state.value === 0) {
        state.value = state.counter;
      } else {
        state.value += state.counter;
      }
    },
    incrementCounter: (state) => {
      state.counter += 1;
    },
    decrementCounter: (state) => {
      state.counter > 0 ? (state.counter -= 1) : state.counter;
    },
  },
});

export const {
  increment,
  decrement,
  addToCartProducts,
  deleteProduct,
  addToCartProductDetail,
  incrementCounter,
  decrementCounter,
} = addToCartProductSlice.actions;
export default addToCartProductSlice.reducer;
