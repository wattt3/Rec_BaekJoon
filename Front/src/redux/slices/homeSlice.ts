import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "../state";

const homeSlice = createSlice({
  name: "HOME",
  initialState: {
    userNames: [],
  } as HomeState,
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

export const { addUserName } = homeSlice.actions;
export default homeSlice.reducer;
