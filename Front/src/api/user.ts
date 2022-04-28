export interface CheckUserNameRequest {
  userName: string;
}

export interface CheckUserNameResponse {
  result: boolean;
  err?: string;
}
