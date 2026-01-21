import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_TOKEN_COINCAP;
const url = import.meta.env.VITE_API_URL;
export const selectCoins = (state) => state.information.coins;
export const selectCoinsLoading = (state) => state.information.loading;
export const selectCoinsTimestamp = (state) => state.information.timestamp;
export const selectCoinsError = (state) => state.information.error;

const initialState = {
  coins: [],
  timestamp: 0,
  loading: false,
  error: null,
};

export const getAllCoins = createAsyncThunk(
  "get/allCoins",
  async (_, thunkAPI) => {
    console.log("REQUEST URL:", url);
    console.log("TOKEN:", token ? "OK" : "EMPTY");
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("AXIOS ERROR:", error?.response?.status, error?.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ошибка загрузки монет"
      );
    }
  }
);

const listOfCoins = createSlice({
  name: "get/listOfCoins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoins.pending, (state) => {
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
