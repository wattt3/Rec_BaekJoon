import reducer from "../slices/historySlice";
import { HistoryState } from "../state";
import { setCurrentUserName } from "../slices/historySlice";

test("초기 상태 확인", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    currentUserName: undefined,
  });
});

test("Set current name of the user.", () => {
  const previousState: HistoryState = {
    currentUserName: undefined,
  };

  expect(reducer(previousState, setCurrentUserName("templer151"))).toEqual({
    currentUserName: "templer151",
  });
});
