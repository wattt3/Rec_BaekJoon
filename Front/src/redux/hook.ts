import { TypedUseSelectorHook, useSelector } from "react-redux";
import { UserState } from "./state";

export interface CombinedState {
  userState: UserState;
}

export const useCombinedStateSelector: TypedUseSelectorHook<CombinedState> =
  useSelector;
