import { ProblemMetadata, Tag } from "../redux/state";

export interface GetProblemRequest {
  userName: string;
}

export interface GetProblemResponse {
  problems: ProblemMetadata[];
  err?: string;
}
