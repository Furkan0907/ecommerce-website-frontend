export interface BaseResponse<T> {
  status: number;
  payload?: T;
  exception?: {
    path: string;
    createTime: string;
    hostName: string;
    message: string;
  }
}
