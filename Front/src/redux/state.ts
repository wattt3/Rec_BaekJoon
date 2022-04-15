// 접속한 유저에 관련된 state
export interface UserState {
  // 유저가 즐겨찾기 해놓은 아이디들
  favoriteUserNames: string[];

  // 유저가 최근에 검색한 아이디들
  historyUserNames: string[];

  // 유저가 현재 검색한 아이디
  currentUserName: string | undefined;

  // 현재 유저의 추천 문제 리스트
  recommendProblemsOfCurrentUser: ProblemMetadata[];
}

// 문제의 정보를 담고 있습니다.
export interface ProblemMetadata {
  // 문제의 id
  problemId: number;

  // 문제의 제목
  title: string;

  // 문제의 level
  level: number;

  // 평균 시도 횟수
  averageTries: number;

  // 문제 맞은 사람 수
  acceptedUserCount: number;

  // 문제의 태그들 (solved.ac 에서는 tags.key)
  tags: string[];

  // 백준으로 넘어갈 수 있는 링크
  link: string;
}
