import { UserState, ProblemMetadata, Tag, TagDisplayName } from "../state";
import reducer, {
  addUserName,
  clickUserInputButton,
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
          problemId: "1",
          title: "새로운 추천 문제",
          level: "2",
          averageTries: "12",
          acceptedUserCount: "1201",
          tags: [
            {
              key: "태그1",
              isMeta: false,
              bojTagId: 10,
              problemCount: 100,
              displayNames: [
                {
                  language: "ko",
                  name: "문제1",
                  short: "문제문제",
                } as TagDisplayName,
              ],
            } as Tag,
          ],
          link: "어떤 백준 링크",
          text: "문제 내용",
        } as ProblemMetadata,
      ])
    )
  ).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: "templer151",
    recommendProblemsOfCurrentUser: [
      {
        problemId: "1",
        title: "새로운 추천 문제",
        level: "2",
        averageTries: "12",
        acceptedUserCount: "1201",
        tags: [
          {
            key: "태그1",
            isMeta: false,
            bojTagId: 10,
            problemCount: 100,
            displayNames: [
              {
                language: "ko",
                name: "문제1",
                short: "문제문제",
              } as TagDisplayName,
            ],
          } as Tag,
        ],
        link: "어떤 백준 링크",
        text: "문제 내용",
      } as ProblemMetadata,
    ],
  });
});

test("즐겨찾기에 들어있는 아이디를 클릭하면 등록해제되어야하고, 없는 아이디라면 추가해야한다.", () => {
  const previousState: UserState = {
    favoriteUserNames: ["templer151"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  };

  expect(
    reducer(previousState, clickUserInputButton("templer151", false))
  ).toEqual({
    favoriteUserNames: [],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });

  expect(
    reducer(previousState, clickUserInputButton("anotheruser", false))
  ).toEqual({
    favoriteUserNames: ["templer151", "anotheruser"],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });

  expect(
    reducer(previousState, clickUserInputButton("templer151", true))
  ).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: ["templer151"],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });

  expect(
    reducer(previousState, clickUserInputButton("anotheruser", true))
  ).toEqual({
    favoriteUserNames: ["templer151"],
    historyUserNames: ["anotheruser"],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  });
});
