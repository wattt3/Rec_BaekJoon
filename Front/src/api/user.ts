export interface checkUserNameRequest {
  userName: string;
}

export interface checkUserNameResponse {
  result: boolean;
  err?: string;
}
