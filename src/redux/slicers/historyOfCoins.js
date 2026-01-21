import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_TOKEN_COINCAP;
const url = import.meta.env.VITE_API_URL;

export const coinHistory = (state) => state.history.history;
export const coinHistoryTimestamp = (state) => state.history.timestamp;

const initialState = {
  history: [],
  timestamp: 0,
};

export const coinsHistory = createAsyncThunk(
  "get/history",
  async ({ slug, interval = "h1", start, end }, thunkAPI) => {
    try {
      const params = { interval };
      if (start) params.start = start;
      if (end) params.end = end;
      const response = await axios.get(`${url}/${slug}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ошибка загрузки истории"
      );
    }
  }
);

const historyOfCoins = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(coinsHistory.fulfilled, (state, action) => {
      state.history = action.payload.data;
      state.timestamp = action.payload.timestamp;
    });
  },
});

export default historyOfCoins.reducer;
