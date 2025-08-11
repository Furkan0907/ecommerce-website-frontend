export interface ApiResponse<T> {
  status: number;
  payload: T;
  error?: string;
}
