import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryState } from "../state";

const historySlice = createSlice({
  name: "HISTORY",
  initialState: {} as HistoryState,
  reducers: {
    setCurrentUserName: (state, action: PayloadAction<string>) => {
      return {
        currentUserName: action.payload,
      };
    },
  },
});

export const { setCurrentUserName } = historySlice.actions;
export default historySlice.reducer;
