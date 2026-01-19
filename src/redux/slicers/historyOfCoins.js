import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_TOKEN_COINCAP;

const initialState = {
  history: [],
  timestamp: 0,
};

export const coinsHistory = createAsyncThunk(
  "get/history",
  async ({ slug, interval = 'h1',start,end }, thunkAPI) => {
    try {
        const params = { interval };
        if (start) params.start = start;
      if (end) params.end = end;
      const response = await axios.get(
        `https://rest.coincap.io/v3/assets/${slug}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );
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
