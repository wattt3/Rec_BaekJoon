import { TypedUseSelectorHook, useSelector } from "react-redux";
import { HistoryState, ProblemRecommendState, UserState } from "./state";

export interface CombinedState {
  userState: UserState;
  problemRecommendState: ProblemRecommendState;
  historyState: HistoryState;
}

export const useCombinedStateSelector: TypedUseSelectorHook<CombinedState> =
  useSelector;
