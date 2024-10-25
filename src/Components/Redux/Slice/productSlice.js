import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  filteredProduct: [],
  status: "idle",
  error: null,
  category: [],
};

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

export const fetchDataCategory = createAsyncThunk(
  "product/fetchDataCategory",
  async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return response.data;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      if (action.payload === "all") {
        state.filteredProduct = state.product;
      } else {
        state.filteredProduct = state.product.filter(
          (productItem) => productItem.category === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
        state.filteredProduct = action.payload; 
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchDataCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchDataCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterByCategory } = productSlice.actions;

export default productSlice.reducer;
