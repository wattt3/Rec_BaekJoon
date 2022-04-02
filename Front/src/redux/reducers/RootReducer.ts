import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../slices/userSlice";

const persistConfig = {
  key: "root",

  // local storage
  storage: storage,

  whitelist: ["userState"],
};

export const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    userState: userSlice,
  })
);
