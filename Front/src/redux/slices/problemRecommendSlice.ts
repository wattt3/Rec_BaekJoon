import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProblemRecommendState, SearchState } from "../state";

const problemRecommendSlice = createSlice({
  name: "RECOMMEND",
  initialState: {
    searchState: SearchState.PRESEARCH,
    maxProblemNumPerPage: 3,
  } as ProblemRecommendState,
  reducers: {
    setSearchState: (state, action: PayloadAction<SearchState>) => {
      return {
        ...state,
        searchState: action.payload,
      };
    },
  },
});

export const { setSearchState } = problemRecommendSlice.actions;
export default problemRecommendSlice.reducer;
