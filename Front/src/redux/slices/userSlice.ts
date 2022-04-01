import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../state";

const userSlice = createSlice({
  name: "USER",
  initialState: {
    userNames: [],
  } as UserState,
  reducers: {
    addUserName(state, action: PayloadAction<string>) {
      const userNames = [...state.userNames];
      if (!userNames.includes(action.payload)) {
        userNames.push(action.payload);
      }
      return {
        ...state,
        userNames,
      };
    },
  },
});

export const { addUserName } = userSlice.actions;
export default userSlice.reducer;
