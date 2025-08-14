import { DtoBase } from "./dto-base.model";

export interface User extends DtoBase {
  username: string;
  email: string;
  role: string;
  isBanned: string;
}

export interface UserRequest {
  username: string;
  email: string;
  password?: string;
  role: string;
}
