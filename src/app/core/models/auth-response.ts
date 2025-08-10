export interface AuthResponse {
  payload : {
    accessToken: string;
    refreshToken: string;
    role: string;
  };
}
