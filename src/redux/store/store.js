import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import listOfCoins from "../slicers/listOfCoins";
import historyOfCoins from "../slicers/historyOfCoins";
import portfolioSlice from "../slicers/portfolioSlice";

const rootReducer = combineReducers({
  information: listOfCoins,
  history: historyOfCoins,
  portfolio: portfolioSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
