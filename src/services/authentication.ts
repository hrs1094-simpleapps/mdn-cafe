import { ApiResponse, AxiosResponse } from "../types/common";
import { UserInfo } from "../types/user";
import axios_client from "./axios_client";

const config = {
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
  },
};

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AxiosResponse<ApiResponse<UserInfo>>> {
  const reqBody = {
    action: "login",
    username: username,
    password: password,
  };
  return axios_client.post("exec", reqBody, config);
}
