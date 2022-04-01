import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../state";

const userSlice = createSlice({
  name: "USER",
  initialState: {
    favoriteUserNames: [],
  } as UserState,
  reducers: {
    addUserName(state, action: PayloadAction<string>) {
      const favoriteUserNames = [...state.favoriteUserNames];
      if (!favoriteUserNames.includes(action.payload)) {
        favoriteUserNames.push(action.payload);
      }
      return {
        ...state,
        favoriteUserNames,
      };
    },
  },
});

export const { addUserName } = userSlice.actions;
export default userSlice.reducer;
