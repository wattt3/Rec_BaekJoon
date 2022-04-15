import { UserState, ProblemMetadata } from "../state";
import reducer, {
  addUserName,
  setCurrentUserName,
  setRecommendProblemMetadatas,
} from "./userSlice";

test("초기 상태 확인", () => {
  expect(reducer(undefined, {} as any)).toEqual({
    favoriteUserNames: [],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });
});

test("Add user's name which is not included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  };

  expect(reducer(previousState, addUserName("anotherUser", false))).toEqual({
    favoriteUserNames: ["templer151", "anotherUser"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });

  expect(reducer(previousState, addUserName("anotherUser", true))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: ["anotherUser"],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });
});

test("Do not add users's name which is included", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  };

  expect(reducer(previousState, addUserName("templer151", false))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });
});

test("Set current user's name", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  };

  expect(reducer(previousState, setCurrentUserName("user2"))).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: "user2",
    recommendProblemsOfCurrentUser: [],
  });
});

test("Set current users's recommend problems.", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: "templer151",
    recommendProblemsOfCurrentUser: [],
  };
  expect(
    reducer(
      previousState,
      setRecommendProblemMetadatas([
        {
          problemId: 1,
          title: "새로운 추천 문제",
          level: 2,
          averageTries: 12,
          acceptedUserCount: 1201,
          tags: ["implementation", "math"],
          link: "어떤 백준 링크",
        } as ProblemMetadata,
      ])
    )
  ).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: "templer151",
    recommendProblemsOfCurrentUser: [
      {
        problemId: 1,
        title: "새로운 추천 문제",
        level: 2,
        averageTries: 12,
        acceptedUserCount: 1201,
        tags: ["implementation", "math"],
        link: "어떤 백준 링크",
      } as ProblemMetadata,
    ],
  });
});
