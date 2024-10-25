import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogged: false,
  user: [],
  status: "idle",
  error: null,
  message: "",
};

export const getLoginUser = createAsyncThunk(
  "users/getLoginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-node-js-five.vercel.app/api/users/signin",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSignUpUser = createAsyncThunk(
  "users/getSignUpUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://server-node-js-five.vercel.app/api/users/signup",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.status = "succeeded";
        state.user = action.payload;
        state.message = action.payload.message;
        state.message = null;
        state.error = null;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.isLogged = false;
        state.status = "failed";
        state.error = action.payload || "Naməlum xəta baş verdi";
        state.message = action.payload;
      });
    builder
      .addCase(getSignUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSignUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getSignUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Naməlum xəta baş verdi";
        state.message = action.payload;
      });
  },
});

export const { resetStatus } = userSlice.actions;

export default userSlice.reducer;
