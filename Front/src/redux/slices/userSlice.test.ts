import { UserState } from "../state";
import reducer, { addUserName } from "./userSlice";

test("초기 상태 확인", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    userNames: [],
  });
});

test("Add user's name which is not included", () => {
  const previousState: UserState = {
    userNames: ["templer151"],
  };

  expect(reducer(previousState, addUserName("anotherUser"))).toEqual({
    userNames: ["templer151", "anotherUser"],
  });
});

test("Do not add users's name which is included", () => {
  const previousState: UserState = {
    userNames: ["templer151"],
  };

  expect(reducer(previousState, addUserName("templer151"))).toEqual({
    userNames: ["templer151"],
  });
});
