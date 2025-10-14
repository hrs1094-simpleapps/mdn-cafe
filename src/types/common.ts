export type AxiosResponse<T> = {
    data: T;
};


export interface ApiResponse<T> {
  result: number;
  message: string;
  data: T;
  token: string;
  jsonData: unknown;
}
