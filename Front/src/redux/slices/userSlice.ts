import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../state";

interface addUserNameAction {
  userName: string;
  isHistory: boolean;
}

const userSlice = createSlice({
  name: "USER",
  initialState: {
    favoriteUserNames: [],
    historyUserNames: [],
  } as UserState,
  reducers: {
    addUserName: {
      reducer: (state, action: PayloadAction<addUserNameAction>) => {
        if (action.payload.isHistory) {
          const historyUserNames = [...state.historyUserNames];
          if (!historyUserNames.includes(action.payload.userName)) {
            historyUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            historyUserNames: historyUserNames,
          };
        } else {
          const favoriteUserNames = [...state.favoriteUserNames];
          if (!favoriteUserNames.includes(action.payload.userName)) {
            favoriteUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            favoriteUserNames: favoriteUserNames,
          };
        }
      },
      prepare: (userName: string, isHistory: boolean) => {
        return { payload: { userName, isHistory } };
      },
    },
  },
});

export const { addUserName } = userSlice.actions;
export default userSlice.reducer;
