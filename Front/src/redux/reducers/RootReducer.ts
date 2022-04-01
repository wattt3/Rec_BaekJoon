import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import homeSlice from "../slices/homeSlice";

const persistConfig = {
  key: "root",

  // local storage
  storage: storage,

  // 지금은 사용자의 로그인 정보만 storage에 저장
  whitelist: ["userState"],
};

export const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    homeState: homeSlice,
  })
);
