import { UserState } from "../state";
import reducer, { addUserName } from "./userSlice";

test("초기 상태 확인", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    favoriteUserNames: [],
    historyUserNames: [],
  });
});

test("Add user's name which is not included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
  };

  expect(reducer(previousState, addUserName("anotherUser", false))).toEqual({
    favoriteUserNames: ["templer151", "anotherUser"],
    historyUserNames: [],
  });

  expect(reducer(previousState, addUserName("anotherUser", true))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: ["anotherUser"],
  });
});

test("Do not add users's name which is included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
  };

  expect(reducer(previousState, addUserName("templer151", false))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
  });
});
