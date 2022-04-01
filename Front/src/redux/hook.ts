import { TypedUseSelectorHook, useSelector } from "react-redux";
import { HomeState } from "./state";

export interface CombinedState {
  homeState: HomeState;
}

export const useCombinedStateSelector: TypedUseSelectorHook<CombinedState> =
  useSelector;
