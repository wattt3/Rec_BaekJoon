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

export enum SearchState {
  // 검색 전
  PRESEARCH,

  // 검색 중
  SEARCHING,

  // 검색 성공
  SUCCESS,

  // 존재하지 않는 이름
  FAIL,

  // 그 외의 오류
  UNKNOWN,
}

export interface ProblemRecommendState {
  searchState: SearchState;
}

// 문제 추천 페이지 필요한 기능
// 추천 받는 유저에 대한 정보
//  추천 결과에 따른 문제 카드들
//  문제에는 우선 순위도가 붙어있음. 1~10~20 까지
// 순위에 따른 문제 우선도를 표현해 주면 좋을꺼 같음.
// 모자이크 판이 필요할까? 혹은 움직이는 그래디언트 부분이 필요할까?

//로딩 스테이트 사용해서 로딩 처리하고, 데이터 다 불러오면 가운데 커다란 투명 패널 설치해서 유저의 정보를 읽어준다.
// 예를들면
// 반갑습니다 ~~~님 ~~~~님이 푼 문제에 대한 분석을 처리하고 있습니다...
// 잠시만 기달려 주세요.
// ~~~님이 푼 문제는 다음과 같습니다.
// 문제에 대한 소시지 형태의 컴포넌트가 등장해야함.
// 이를 바탕으로 풀어볼 만 한 문제를 준비해 봤습니다.
// 이러고 투명 판이 아래로 내려가고, 그 후에 배경 화면에 추천 문제 카드들이 등장해서 보여준다.
// 문제 카드 내부에는 연한 회색으로 숫자가 들어있음(순위) 그 옆으로 문제에 대한 제목, 간단한 설명, 태그 같은게 들어가면 좋을꺼 같음.
//
// 유저 계정을 조회하여 해당 유저가 어떤 문제들을 풀었는지 소세지 메뉴 형태로 보여준다, 해당 문제들을 클릭하면 백준 링크가 걸려있어서 백준 페이지로 넘어갈 수 있게 해줌.
// 그 후에 추천 문제에 대한 내용이 나오면 됨.
