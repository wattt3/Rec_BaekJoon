// 접속한 유저에 관련된 state
export interface UserState {
  // 유저가 즐겨찾기 해놓은 아이디들
  favoriteUserNames: string[];

  // 유저가 최근에 검색한 아이디들
  historyUserNames: string[];
}
