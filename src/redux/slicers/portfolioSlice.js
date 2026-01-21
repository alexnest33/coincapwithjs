import { createSlice } from "@reduxjs/toolkit";



export const selectPortfolioPositionsSafe = (state) => state.portfolio.positions || {};

const initialState = {
  positions: {},
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    buyCoin: (state, action) => {
      const { coin, amount } = action.payload;

      const id = coin.id;
      const qty = Number(amount);
      const price = Number(coin.priceUsd);

      if (!qty || qty <= 0 || !price) return;

      const prev = state.positions[id];

      if (!prev) {
        state.positions[id] = {
          id,
          name: coin.name,
          symbol: coin.symbol,
          amount: qty,
          costBasisUsd: qty * price,
        };
      } else {
        prev.amount = Number(prev.amount) + qty;
        prev.costBasisUsd = Number(prev.costBasisUsd) + qty * price;
      }
    },

    removeCoin: (state, action) => {
      delete state.positions[action.payload];
    },

    clearPortfolio: (state) => {
      state.positions = {};
    },
  },
});

export const { buyCoin, removeCoin, clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
