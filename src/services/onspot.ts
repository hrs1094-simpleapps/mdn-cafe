import { ApiResponse, AxiosResponse } from "../types/common";
import { UserInfo } from "../types/user";
import axios_client from "./axios_client";

const config = {
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
  },
};

export async function submitonSpot({
  name,
  email,
  team_or_id,
  breakfast,
  lunch,
  snacks,
}: {
  name: string;
  email: string;
  team_or_id: string;
  breakfast: string;
  lunch: string;
  snacks: string;
}): Promise<AxiosResponse<ApiResponse<UserInfo>>> {
  const reqBody = {
    action: "onspot",
    name,
    email,
    team_or_id,
    breakfast:breakfast,
    lunch:lunch,
    snacks:snacks
  };
  return axios_client.post("exec", reqBody, config);
}


export async function submitonSubscription({
  name,
  email,
  team_or_id,
  breakfast,
  lunch,
  snacks,
}: {
  name: string;
  email: string;
  team_or_id: string;
  breakfast: string;
  lunch: string;
  snacks: string;
}): Promise<AxiosResponse<ApiResponse<UserInfo>>> {
  const reqBody = {
    action: "subscribe",
    name,
    email,
    team_or_id,
    breakfast:breakfast,
    lunch:lunch,
    snacks:snacks
  };
  return axios_client.post("exec", reqBody, config);
}
