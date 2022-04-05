import { UserState } from "../state";
import reducer, { addUserName, setCurrentUserName } from "./userSlice";

test("초기 상태 확인", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    favoriteUserNames: [],
    historyUserNames: [],
    currentUserName: undefined,
  });
});

test("Add user's name which is not included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
  };

  expect(reducer(previousState, addUserName("anotherUser", false))).toEqual({
    favoriteUserNames: ["templer151", "anotherUser"],
    historyUserNames: [],
    currentUserName: undefined,
  });

  expect(reducer(previousState, addUserName("anotherUser", true))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: ["anotherUser"],
    currentUserName: undefined,
  });
});

test("Do not add users's name which is included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
  };

  expect(reducer(previousState, addUserName("templer151", false))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
  });
});

test("Set current user's name", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
  };

  expect(reducer(previousState, setCurrentUserName("user2"))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: "user2",
  });
});
