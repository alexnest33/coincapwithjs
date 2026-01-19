import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_TOKEN_COINCAP;

const initialState = {
  coins: [],
  timestamp: 0,
  loading: false,
  error: null,
};

export const getAllCoins = createAsyncThunk(
  "get/allCoins",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://rest.coincap.io/v3/assets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const listOfCoins = createSlice({
  name: "get/listOfCoins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoins.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllCoins.fulfilled, (state, action) => {
      state.coins = action.payload.data;
      state.timestamp = action.payload.timestamp;
      state.loading = false;
    })
    .addCase(getAllCoins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default listOfCoins.reducer;
