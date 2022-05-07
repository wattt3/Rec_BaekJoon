import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import historySlice from "../slices/historySlice";
import problemRecommendSlice from "../slices/problemRecommendSlice";
import userSlice from "../slices/userSlice";

const persistConfig = {
  key: "joljak",

  // local storage
  storage: storage,

  whitelist: ["userState"],
};

export const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    userState: userSlice,
    problemRecommendState: problemRecommendSlice,
    historyState: historySlice,
  })
);
