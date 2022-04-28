import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ProblemRecommendState, UserState } from "./state";

export interface CombinedState {
  userState: UserState;
  problemRecommendState: ProblemRecommendState;
}

export const useCombinedStateSelector: TypedUseSelectorHook<CombinedState> =
  useSelector;
