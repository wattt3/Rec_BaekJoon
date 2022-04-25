import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemRecommendState, SearchState } from "../state";

const problemRecommendSlice = createSlice({
  name: "RECOMMEND",
  initialState: {
    searchState: SearchState.PRESEARCH,
  } as ProblemRecommendState,
  reducers: {
    setSearchingState: (state, action: PayloadAction<SearchState>) => {
      return {
        ...state,
        searchState: action.payload,
      };
    },
  },
});

export const { setSearchingState } = problemRecommendSlice.actions;
export default problemRecommendSlice.reducer;
