import reducer, { setSearchState } from "../slices/problemRecommendSlice";
import { ProblemRecommendState, SearchState } from "../state";

test("Expect initial state.", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    searchState: SearchState.PRESEARCH,
    maxProblemNumPerPage: 3,
  } as ProblemRecommendState);
});

test("Update new SearchState when the searchState passed.", () => {
  const previousState = {
    searchState: SearchState.PRESEARCH,
    maxProblemNumPerPage: 3,
  } as ProblemRecommendState;

  expect(reducer(previousState, setSearchState(SearchState.FAIL))).toEqual({
    searchState: SearchState.FAIL,
    maxProblemNumPerPage: 3,
  } as ProblemRecommendState);
});
