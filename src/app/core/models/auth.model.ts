import { DtoBase } from "./dto-base.model";

export interface AuthResponse extends DtoBase {
    accessToken: string;
    refreshToken: string;
    role: string;
}

export interface AuthRequest {
  username : string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

